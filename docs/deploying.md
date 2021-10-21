# Deploying

Deployment is documented to show what is possible to achieve. However, we do not provide all the pieces that are needed for you to deploy this demo.

## Azure Kubernetes Services (AKS)

At Sitecore, we deploy multiple instances of the PLAY! Summit demo daily on AKS and Vercel. AKS deployments are using Helm charts we are maintaining in the [container-deployment repository](https://github.com/Sitecore/container-deployment/tree/master/demo/10.0).

Unfortunately, the Helm charts are using multiple secrets stored in secret files. Those secrets and files are not provided for obvious reasons. We also do not provide the software we developed to orchestrate these Helm chart deployments as it is tightly linked to these secret files.

## Vercel

The source code of all the Next.js projects is copied into the init container Docker image when it is built. During AKS deployments, all Next.js projects are deployed to one shared Vercel account using the init container `DeployToVercel.cs` job and the Vercel CLI.
