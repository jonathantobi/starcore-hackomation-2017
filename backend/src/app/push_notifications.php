<?php 

function sendMessage($headings, $content, $filters, $data){

    $fields = array(
        'app_id' => "ec77f744-7135-44ad-ae83-1d6c89d200d2",
        'filters' => $filters,
        'data' => $data,
        'contents' => $content,
        'headings' => $headings
    );

    $fields = json_encode($fields);
    print("\nJSON sent:\n");
    print($fields);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                                               'Authorization: Basic YjIxYjcwMmUtODY4Yy00ZGRhLTk0YzctODI0ZjBjMWE3N2Q1'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);
    
    return $response;
}
    
 ?>