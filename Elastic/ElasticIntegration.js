function GetFormattedDate()
{
	var d = new Date();
	d = new Date(d.getTime() + d.getTimezoneOffset() * 60000); // elastic expects UTC
	var dateString =  d.getFullYear() + "-" +  ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0"+d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "." + ("0" + d.getMilliseconds()).slice(-3);
	return dateString;
}

function SendTestStatusToElastic()
{
	Global.DoLoadObjects('%WORKDIR%/../Elastic/Elastic.objects.js');
	g_restRoot = Global.GetCurrentDir() + "\\..\\Elastic";

	// Calculate timestamp
	var dateString = GetFormattedDate();

	// Test name
	var testName = g_scriptFileName.split('\\').slice(-1);
	
	// Test status
	var status = Tester.GetTestStatus();

	// Prepare log record
	var record = 
	{
	  "timestamp": dateString,
	  "testname": testName,
	  "status": status
	}

	// Post to ElasticSearch
	var Elastic_SEED=SeS('Elastic_SEED');
	Elastic_SEED.SetRequestBodyObject(record);
	Elastic_SEED._DoExecute(record);
}

function ElasticLog(msg)
{
	function _initializeLogging()
	{
	    for (var i = 0; i < 5; i++)
	    {
	        // Set all verbose levels
	        if (i <= g_verboseLevel)
	            eval("l" + i + "=true;");
	        else
	            eval("l" + i + "=false;");
	    }
	}

	var verboseLevel = g_verboseLevel;

	// Suppress logging to avoid recursion	
	g_verboseLevel = 0;
	_initializeLogging();

	Global.DoLoadObjects('%WORKDIR%/../Elastic/Elastic.objects.js');
	g_restRoot = Global.GetCurrentDir() + "\\..\\Elastic";

	// Calculate timestamp
	var dateString = GetFormattedDate();

	// Test name
	var testName = g_scriptFileName.split('\\').slice(-1);
	

	// Prepare log record
	var record = 
	{
	  "timestamp": dateString,
	  "testname": testName,
	  "message": msg
	}

	// Post to ElasticSearch
	var Elastic_LOG=SeS('Elastic_LOG');
	Elastic_LOG.SetRequestBodyObject(record);
	Elastic_LOG._DoExecute(record);
	
	// Resume logging
	g_verboseLevel = verboseLevel;
	_initializeLogging();
}

