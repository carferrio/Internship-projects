<?php


	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$result = file_get_contents('libs\others\countryBorders.geo.json');

    
    $decode = json_decode($result,true);
    
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";

    
    $output['data'] = $decode['features'];
    
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output);

?>