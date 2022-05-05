# Ensure Docker is running
$dockerStatus = docker ps
if (!$dockerStatus) {
  Throw "Docker Desktop is not running. Please check the Docker service status."
}

# Ensure containers are running
$runningContainers = docker container ls -a --format '{{json .}}' | ConvertFrom-Json | Where-Object { $_.Labels.Contains($PWD) }
if (!$runningContainers) {
  Throw "Docker containers are not running. Please start the containers."
}
