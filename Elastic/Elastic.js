
//########## Script Steps ##############

function Test()
{
	Log = ElasticLog;
	ElasticLog("ElasticLog installed");


	// Run the test
	var status = Math.random() * 10 > 5 ? 1 : 0;
	Tester.Assert("Flaky status", status);

	
	SendTestStatusToElastic();
}

g_load_libraries=["Web Service"];



