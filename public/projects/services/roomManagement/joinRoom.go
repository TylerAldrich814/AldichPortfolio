package roomManagement

import (
	"net/http"

	chronAuthentication "github.com/TylerAldrich814/Chronicles/services/authentication"
	"github.com/TylerAldrich814/Chronicles/services/httpResponses"
)

func joinRoom(
  w http.ResponseWriter,
  r *http.Request,
){
  fb := chronAuthentication.FirebaseAuth{}
  fb.Init().GetClient()
  resp := httpResponses.Response{}

  token, err := fb.GetAuthToken(r.Context(), r)
  if err != nil {
    http.Error(w, err.Error(), http.StatusUnauthorized)
    return
  }
  roomName := r.FormValue("roomName")

  w.Header().Set("Content-Type","application/json")

  if exist, err := fb.DocExists(COLLECTION, roomName); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  } else if !exist {
    http.Error(w, err.Error(), http.StatusNoContent)
    return
  }

  // Verify user hasn't joined Room already.
  users, err := fb.GetFirestoreSubField(COLLECTION, roomName, "Users")
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  for _, user := range users {
    if userId, ok := user.(string); ok && userId == token.UID {
      resp.AddStatus("User already exists in Room").AddStatusCode(http.StatusPreconditionFailed)
      response, err := resp.Build()
      if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
      }
      w.WriteHeader(http.StatusPreconditionFailed)
      if _, writeErr := w.Write(response); writeErr != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
      }
    }else if !ok {
      http.Error(w, "Internal Error occurred while Searching Chatroom Usr log", http.StatusInternalServerError)
      return
    }
  }

  // Add User to Room Users log
  if err := fb.UpdateFirestoreField(
    COLLECTION,
    roomName,
    map[string]interface{}{
      "Users": token,
    },
  ); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  response, err := resp.AddStatus("Successfully Added user to Room").Build()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }
  w.WriteHeader(http.StatusOK)
  if _, writeErr := w.Write(response); writeErr != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

}
