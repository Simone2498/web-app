<html lang="en">
    <head>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Legal search engine and lawyers' operating tool">
        <meta name="author" content="Simone Grassi">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
        <!-- FontAwesome -->
        <link href="./fontawesome/css/all.css" rel="stylesheet">
    </head>
    <body>
        <!-- Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
        
        <ul class="nav" style='height:6vh'>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <div class='container'>
            <div class='row'>
                <div class='col-md-12 text-center align-self-center'>
                    <img src='./img/logo1.png' style=''/>
                </div>
            </div>
            <div class='row'>
                <div class="form-group col-md-12 text-center align-self-center">
                   <form id='queryForm' name='queryForm' action='./tool.php' method='POST'>
                   <textarea class="form-control" id="query" name='query' rows="7" placeholder='Inserisci una descrizione dei fatti il quanto piú tecnica e accurata possibile'></textarea>
                   </form>
                </div>
            </div>
            <div class='row'>
                <div class='col-md-12 text-center align-self-center'>
                    <button type="button" class="btn btn-primary btn-lg btn-block" style='background-color: #3c89c9;border-color: #3a75a6;margin-bottom:3rem' id='searchBtn'>AVVIA LA RICERCA</button>
                </div>    
            </div>
            <div class='row'>
                <div class='col-md-4 text-center align-self-center'>
                    A
                </div>
                <div class='col-md-4 text-center align-self-center'>
                    B
                </div>
                <div class='col-md-4 text-center align-self-center'>
                    C
                </div>
            </div>
        </div>
        <script>
            $(document).ready(function(){
               $(`#searchBtn`).click(function(){
                  $(`#queryForm`).submit(); 
               }); 
            });
        </script>
    </body>
</html>