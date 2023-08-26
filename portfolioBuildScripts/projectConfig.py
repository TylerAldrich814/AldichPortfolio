import yaml

class ProjectConfig:
    def __init__(self, file_path):
        with open(file_path, 'r') as file:
            data = yaml.safe_load(file)

        project = data['Project']
        self.Name = project['Name']
        self.RootDir = project['RootDirectory']
        self.SourceDir = project['SourceDirectory']
        self.CompleteSrcDir = self.RootDir + self.SourceDir # ??
        self.IgnoreFiles = project['IgnoreFiles']
        self.FirebaseCred = project['FirebaseCredentials']
        self.BucketPath = project['BucketPath']
        self.Extensions = project['Extensions']


    def test(self):
        print(f"----------Name - {self.Name}")
        print(f"-------RootDir - {self.RootDir}")
        print(f"-----SourceDir - {self.SourceDir}")
        print(f"---IgnoreFiles - {self.IgnoreFiles}")
        print(f"--FirebaseCred - {self.FirebaseCred}")
        print(f"----BucketPath - {self.BucketPath}")
        print(f"----Extensions - {self.Extensions}")


if __name__ == "__main__":
    config = ProjectConfig('./projectSettings.yaml')
    config.test()