# escape=`

ARG PARENT_IMAGE

FROM ${PARENT_IMAGE}

ENTRYPOINT ["powershell.exe", ".\\Start.ps1", "-SitecoreSolrConnectionString $env:SITECORE_SOLR_CONNECTION_STRING", `
    "-SolrCorePrefix $env:SOLR_CORE_PREFIX_NAME", `
    "-SolrSitecoreConfigsetSuffixName $env:SOLR_SITECORE_CONFIGSET_SUFFIX_NAME", `
    "-SolrReplicationFactor $env:SOLR_REPLICATION_FACTOR", `
    "-SolrNumberOfShards $env:SOLR_NUMBER_OF_SHARDS", `
    "-SolrMaxShardsPerNodes $env:SOLR_MAX_SHARDS_NUMBER_PER_NODES", `
    "-SolrXdbSchemaFile .\\data\\schema.json", `
    "-SolrCollectionsToDeploy $env:SOLR_COLLECTIONS_TO_DEPLOY"]