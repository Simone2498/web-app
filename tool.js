$(document).ready(function(){
   
   let _results_list = [[0,'zero',0],[1,'uno',0],[2,'due',0],[3,'tre',0]];
   _qry = 'Ciao a tutti'; //FOR DEBUG
   let _my_report = [];
   let _enc_qry = [];
   let _R = [];
   let _NR = [];
   get_encode(_qry);
   search(_enc_qry, 0, 0);
   /*---- Modifica della query di ricerca ----*/ 
   $(`#modifyBtn`).click(function(){
      $(`#modifyModal`).modal('toggle'); 
      $(`#query`).val(_qry);
   });
   $(`#modifyOK`).click(function(){
      $(`#modifyModal`).modal('toggle'); 
      _qry = $(`#query`).val();
      get_encode(_qry);
      search(_enc_qry, $(`#expandSearch`).data('state'), $(`#dynamicSearch`).data('state'));
   });
   /*---- Ricerca dinamica ----*/
   $(`#dynamicSearch`).click(function(){
       if($(this).data('state')!=1){
           $(this).css('color','#007bff');
           $(this).data('state',1);
       }
       else{
           $(this).css('color','black');
           $(this).data('state',0);
       }
   });
   /*---- Ricerca espansa alle linee guida ----*/
   $(`#expandSearch`).click(function(){
       if($(this).data('state')!=1){
           $(this).css('color','#007bff');
           $(this).data('state',1);
           search(_enc_qry, $(`#expandSearch`).data('state'), $(`#dynamicSearch`).data('state'));
       }
       else{
           $(this).css('color','black');
           $(this).data('state',0);
           search(_enc_qry, $(`#expandSearch`).data('state'), $(`#dynamicSearch`).data('state'));
       }
   });

   
   function UI_searchresults(list){
       str = '';
       for (el of list){
           str += `<tr id='L_${el[0]}'>
                      <td>${el[1]}</td>
                      <td style="text-align:center"><button type="button" class="btn btn-light info" style="padding: 5px;" data-toggle="tooltip" data-placement="bottom" title="Leggi"><i class="far fa-question-circle"></i></button></td>
                      <td style="text-align:center"><button type="button" class="btn btn-light move" style="padding: 5px;" data-toggle="tooltip" data-placement="bottom" title="Inserisci nel report"><i class="fas fa-arrow-circle-right"></i></button></td>
                    </tr>`;
       }
       $(`#col_sx`).html(str);
       
       $(`.move`).click(function(){
           let id = $(this).parent().parent().attr('id').split('_')[1];
           $(`#col_dx`).prepend(UI_row_dx(id));
           $(this).parent().parent().hide();
           _my_report.append(id);
            const index = _NR.indexOf(id);//Add to relevant documents or remove from not relevant
            if (index > -1) {
                _NR.splice(index, 1);
            }
            else{
                _R.append(id);
            } 
           
           $(`.remove`).click(function(){
               let id = $(this).parent().parent().attr('id').split('_')[1];
               $(`#L_${id}`).show();
               $(this).parent().parent().remove();
               remove_element(id);
                const index = _R.indexOf(id);
                if (index > -1) {
                    _R.splice(index, 1);
                }
                else{
                    _NR.append(id);
                }
           });
           $(`.info`).click(function(){
               let id = $(this).parent().parent().attr('id').split('_')[1];
               UI_infobox(id);
           });
           
       });
       $(`.info`).click(function(){
           let id = $(this).parent().parent().attr('id').split('_')[1];
           UI_infobox(id);
       });
   }
   
   function UI_row_dx(id){
        return `<tr id='D_${id}'>
                  <td>${get_law_name(id)}</td>
                  <td style="text-align:center"><button type="button" class="btn btn-light info" style="padding: 5px;" data-toggle="tooltip" data-placement="bottom" title="Leggi"><i class="far fa-question-circle"></i></button></td>
                  <td style="text-align:center"><button type="button" class="btn btn-light remove" style="padding: 5px;" data-toggle="tooltip" data-placement="bottom" title="Rimuovi"><i class="fas fa-minus-circle"></i></button></td>
                </tr>`;
   }
   
   function get_law_name(id){
        for (el of _results_list)
            if (el[0]==id) return el[1];
        return 'Documento non trovato';
    }

   function remove_element(id){
        const index = _my_report.indexOf(id);
        if (index > -1) {
            _my_report.splice(index, 1);
        }
   }

   function get_encode(text){
        data = {};
        data.qry = text;
        $.post(
            'https://flask-app-sp9di.ondigitalocean.app/encode',
            data,
            function(ret){
                try {
                    _enc_qry = ret;
                }
                catch (e){
                    alert(`C'é stato un errore di comunicazione con il server, ti invitiamo a provare piú tardi o a contattare l'assistenza`);
                }
            });
   }

   /*---- Info BOX ----*/
   function UI_infobox(id){
       data={}
       data.id=id
       $.post(
           'https://flask-app-sp9di.ondigitalocean.app/get_info',
           data,
           function(ret){
               try {
                data = ret;
                $(`#info_chapter`).html(`Chapter ${ret[1]}: ${ret[2]}`);
                $(`#info_article`).html(`Article ${ret[3]}: ${ret[4]}`);
                $(`#info_subarticle`).html(`Comma ${ret[5]}`);
                $(`#info_text`).html(ret[6]);
                $(`#info_insert`).data('id',ret[0]);
                $(`#info_link`).data('href',ret[7]);
                $(`#readModal`).modal('show');
               }
               catch (e){
                alert(`C'é stato un errore di comunicazione con il server, ti invitiamo a provare piú tardi o a contattare l'assistenza`);
               }
       });
   }
   $(`#info_link`).click(function(){
        let link = $(this).data('href');
        window.open(link, 'GDPR');
    });
   $(`#info_insert`).click(function(){
        let id = $(this).data('id');
        $(`#L_${id}`).children().eq(2).children().click();
        $(`#readModal`).modal('hide');
    });
   
   function search(enc, inc, dyn=0){
       data = {};
       data.enc = enc;
       data.inc = inc;
       data.dyn = dyn;
       if (dyn)
        data.R = JSON.stringify(_R);
        data.NR = JSON.stringify(_NR);
       $.post(
           'https://flask-app-sp9di.ondigitalocean.app/search',
           data,
           function(ret){
               try {
                //alert(ret)
                _enc_qry = ret[0];
                _results_list = ret[1];
                if (dyn){
                    _R =[];
                    _NR =[];
                }
                UI_searchresults(_results_list);
               }
               catch (e){
                alert(`C'é stato un errore di comunicazione con il server, ti invitiamo a provare piú tardi o a contattare l'assistenza`);
               }
           });
   }
   
   
    
});