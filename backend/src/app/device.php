<?php 

$app->post('/api/add_device',
    function(){

        require 'dbconnect.php';

        $serial = $_POST['name'];
        $password = sha1($_POST['password']);

        $sql = "SELECT * FROM devices WHERE (`serial` = '$serial' AND password = '$password')";

        $query = $conn->query($sql);

        if ($query) {
            while ($result = $query->fetch_assoc()) {
                // put data into the $result_array
                $result_array[] = $result;
            }

            print_r(json_encode($result_array));
        }else{
            echo 0;
            // echo $conn->error;
        }
    });

$app->post('/api/write', 
    function(){

        #db connection
        require 'dbconnect.php';

        $serial = $_POST['serial'];
        $fire_value = $_POST['fire_value'];
        $gas_value = $_POST['gas_value'];
        if ($_POST['fire'] == 1) {
            $fire = 'yes';
        }else if($_POST['fire'] == 0){
            $fire = 'no';
        }


        #get device id
        $sql = "select id from devices where (serial = '$serial')";

        $query = $conn->query($sql); 

        if ($query){

            while ($result = $query->fetch_assoc()) {
                $id = $result['id'];
            }

            $sql = "INSERT INTO `readings` ( `device_id`, `fire_value`, `gas_value` ,`fire`, `created`) VALUES ( '$id', '$fire_value', '$gas_value', '$fire', NOW())";

            $query = $conn->query($sql);

            if ($query) {
                 $filters = array(array("field" => "tag", "key" => "device_$id", "relation" => "=", "value" => "subscribed"));
                $data = array("id" => "$id", "name" => "$serial");
                if ($fire == 'yes') {
                    $content = array("en" => "Er is mogelijk brand bij u thuis");
                    $headings = array("en" => "Brand melding!");
                }else if($fire == 'no'){
                    $content = array("en" => "Er zit mogelijk een gevaarlijke gas in uw huis");
                    $headings = array("en" => "Gas melding!");
                }

                sendMessage($headings, $content, $filters, $data);

               echo 1;
            }

        }else{
            echo 0;
            // echo $conn->error;
        }  
    });

$app->get('/api/get_readings/{id}',
    function($request){

        require 'dbconnect.php';

        $id = $request->getAttribute('id');

        $sql = "SELECT * FROM readings WHERE (`device_id` = '$id')";

        $query = $conn->query($sql);

        if ($query) {
            $result_array = array();

            # get data
            while ($result = $query->fetch_assoc()) {
                // put data into the $result_array
                $result_array[] = $result;
            }

            # send response as json
            $result_array = json_encode($result_array);
            print_r($result_array);
        }else{
            echo 0;
            // echo $conn->error;
        }
    });

$app->post('/api/empty_readings',
    function(){

        require 'dbconnect.php';

        $sql = "DELETE FROM readings";

        $query = $conn->query($sql);

        if ($query) {
            echo "fields deleted";
        }else{
            // echo 0;
            echo $conn->error;
        }
    });

 ?>