<?php
	require 'vendor/autoload.php';
?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="./favicon.ico">

    <title>Jumbotron Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="./css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

    <?php
		define('API_KEY', 'AIzaSyBAvbrh_8zuMsW3HpxeQKd1YClfF-3wn6A');
		define('CALENDAR_ID', 'nkvgajubn1didma26d8fcijs1c%40group.calendar.google.com');
		define('CLIENT_ID', '307914578402-lh7dgsmkt390hinj6hlb2o0mu0768v08.apps.googleusercontent.com');
		define('SCOPE', 'https://www.googleapis.com/auth/calendar.readonly');

	?>

  </head>

  <body>
    <a href="https://console.developers.google.com/project/noted-feat-714/apiui/credential">API login</a> | <a href="https://developers.google.com/google-apps/calendar/">API Docs</a> | <a href="https://groups.google.com/forum/embed/?place=forum/google-calendar-api">Calendar API Google Group</a>

    <div>



<?php



$client = new Google_Client();
$client->setApplicationName("Client_Library_Examples");
$client->setDeveloperKey(API_KEY);

$service = new Google_Service_Books($client);

/************************************************
  We make a call to our service, which will
  normally map to the structure of the API.
  In this case $service is Books API, the
  resource is volumes, and the method is
  listVolumes. We pass it a required parameters
  (the query), and an array of named optional
  parameters.
 ************************************************/
$optParams = array('filter' => 'free-ebooks');
$results = $service->volumes->listVolumes('Henry David Thoreau', $optParams);

/************************************************
  This call returns a list of volumes, so we
  can iterate over them as normal with any
  array.
  Some calls will return a single item which we
  can immediately use. The individual responses
  are typed as Google_Service_Books_Volume, but
  can be treated as an array.
 ***********************************************/
echo "<h3>Results Of Call:</h3>";
foreach ($results as $item) {
  echo $item['volumeInfo']['title'], "<br /> \n";
}

/************************************************
  This is an example of deferring a call.
 ***********************************************/
$client->setDefer(true);
$optParams = array('filter' => 'free-ebooks');
$request = $service->volumes->listVolumes('Henry David Thoreau', $optParams);
$results = $client->execute($request);

echo "<h3>Results Of Deferred Call:</h3>";
foreach ($results as $item) {
  echo $item['volumeInfo']['title'], "<br /> \n";
}









	$client = new Google_Client();
	$client->setClassConfig("Google_Http_Request", "disable_gzip", true);
	$client->setApplicationName("Client_Library_Examples");
	$client->setDeveloperKey(API_KEY);

	$service = new Google_Service_Books($client);
	$optParams = array();//array('filter' => 'free-ebooks');
	$results = $service->volumes->listVolumes('Henry David Thoreau', $optParams);

	// The & are getting double encoded :(

	foreach ($results as $item) {
		echo $item['volumeInfo']['title'], "<br /> \n";
	}

 ?>






    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="./js/bootstrap.min.js"></script>

  </body>
</html>


