function Test()
{
	// Override Log function to redirect logging to Elasticsearch
	Log = ElasticLog;

	// Your test code
	var status = Math.random() * 10 > 5 ? 1 : 0;
	Tester.Assert("2 + 2 = 4", status);
	
	// Send test execution status to Elasticsearch
	SendTestStatusToElastic();
}

g_load_libraries=["Web Service"];

