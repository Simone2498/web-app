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
        
        <style>
            .my-nav {
            	height: 6vh;
            	background-color: white;
            	width: 50vw;
            	margin-left: 25vw;
            	border-radius: 0 0 0.5rem 0.5rem;
            }
        </style>
        
    </head>
    <body style='background-color:#f8f9fa'>
        <!-- Bootstrap JS -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
        
        <script src="./tool.js"></script>
        <!-- Init -->
        <script>
           let _qry = `<?php if (isset($_POST['qry'])) echo $_POST['qry']; else echo ''; ?>`;
        </script>
        
        
        <!-- Navbar -->
        <ul class="nav my-nav" style='height:6vh'>
          <li class="nav-item w-25 text-center align-self-center">
            <button type="button" class="btn btn-light" style="padding: 5px;width:60%;background-color:white" data-toggle="tooltip" data-placement="bottom" title="Indietro" onclick='window.location="./home.php"'><i class="fas fa-arrow-circle-left"></i></button>
          </li>
          <li class="nav-item w-25 text-center align-self-center">
            <button type="button" class="btn btn-light" style="padding: 5px;width:60%;background-color:white" data-toggle="tooltip" data-placement="bottom" title="Edit query" id='modifyBtn'><i class="fas fa-edit"></i></button>
          </li>
          <li class="nav-item w-25 text-center align-self-center">
            <button type="button" class="btn btn-light" style="padding: 5px;width:60%;background-color:white" data-toggle="tooltip" data-placement="bottom" title="Dynamic search" id='dynamicSearch'><i class="fas fa-undo"></i></button>
          </li>
          <li class="nav-item w-25 text-center align-self-center">
            <button type="button" class="btn btn-light" style="padding: 5px;width:60%;background-color:white" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"><i class="fas fa-arrow-circle-left"></i></button>
          </li>
        </ul>
        <!-- Body -->
        <div class='container' style='height:94vh'>
            <div class='row' style='height:94vh'>
                <div class='col-md-6 text-center align-self-top' style=''>
                    <div class='row' style="margin: 0; height:4vh">
                        A
                    </div>
                    <div class='row' style="margin: 0;">
                        <div class='col-md-12 text-center align-self-top' style="border: 1px solid #6c757d;border-radius: 0.25rem;height: 89vh;margin: 0rem;overflow-y:scroll;background-color:white">
                        <table class="table table-sm table-hover">
                          <tbody id='col_sx'>
                            
                          </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                <div class='col-md-6 text-center align-self-top'>
                    <div class='row' style="margin: 0; height:4vh">
                    A
                    </div>
                    <div class='row' style="margin: 0;">
                        <div class='col-md-12 text-center align-self-top' style="border: 1px solid #6c757d;border-radius: 0.25rem;height: 83vh;margin: 0rem;overflow-y:scroll;background-color:white">
                        <table class="table table-sm table-hover">
                          <tbody id='col_dx'>
                            
                          </tbody>
                        </table>
                        </div>
                    </div>
                    <div class='row' style="margin: 0; height:6vh">
                    <button type="button" class="btn btn-primary btn-sm" style="height: 4vh;margin-top: 1vh;padding: 0;width: 100%;background-color: #3c89c9;border-color: #3a75a6;"data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Esporta report</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal read -->
        <div class="modal" tabindex="-1" id='readModal'>
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h2 id='info_chapter'>Chapter #: Chapter_Title</h2>
                <h2 id='info_article' style='padding-left:1vw'>Article #: Article_Title</h2>
                <h2 id='info_subarticle' style='padding-left:2vw'>Comma: #</h2>
                <hr/>
                <h5 id='info_text'>Text</h5>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-info" id='info_link'>Link</button>
                  <button type="button" class="btn btn-primary" id='info_insert'>Inserisci</button>
              </div>  
            </div>
          </div>
        </div>
        <!-- Modal modifica -->
        <div class="modal" tabindex="-1" id='modifyModal'>
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modifica la query di ricerca</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <textarea class="form-control" id="query" name='query' rows="7" placeholder='Inserisci una descrizione dei fatti il quanto piú tecnica e accurata possibile'></textarea>
              </div>
              <div class="modal-footer">
                  <button type="button" id='modifyOK' class="btn btn-primary" style="height: 4vh;margin-top: 1vh;padding: 0;width: 100%;background-color: #3c89c9;border-color: #3a75a6;">Aggiorna</button>
              </div>
            </div>
          </div>
        </div>
        
    </body>
</html>