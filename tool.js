$(document).ready(function(){
   
   let _results_list = [[0,'zero'],[1,'uno'],[2,'due'],[3,'tre']];
   _qry = 'Ciao a tutti';
   
   UI_searchresults(_results_list);
   
   $(`#modifyBtn`).click(function(){
      $(`#modifyModal`).modal('toggle'); 
      $(`#query`).val(_qry);
   });
   $(`#modifyOK`).click(function(){
      $(`#modifyModal`).modal('toggle'); 
      _qry = $(`#query`).val();
      search(_qry, $(`#expandSearch`).data('state'));
   });
   
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
   $(`#expandSearch`).click(function(){
       if($(this).data('state')!=1){
           $(this).css('color','#007bff');
           $(this).data('state',1);
           search(_qry, $(`#expandSearch`).data('state'));
       }
       else{
           $(this).css('color','black');
           $(this).data('state',0);
           search(_qry, $(`#expandSearch`).data('state'));
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
       //@todo nascondere quelle giá nella colonna dx
       $(`.move`).click(function(){
           let id = $(this).parent().parent().attr('id').split('_')[1];
           $(`#col_dx`).prepend(UI_row_dx(id));
           $(this).parent().parent().hide();
           
           $(`.remove`).click(function(){
               let id = $(this).parent().parent().attr('id').split('_')[1];
               $(`#L_${id}`).show();
               $(this).parent().parent().remove();
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
    
   function UI_infobox(id){
       data={}
       data.id=id
       $.post(
           'https://www.thinklegalia.it/API/get_info',
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
   
   function search(qry, inc){
       data = {};
       data.qry = qry;
       data.inc = inc;
       $.post(
           'https://www.thinklegalia.it/API/search',
           data,
           function(ret){
               try {
                alert(ret);
                //_results_list = JSON.parse(ret);
                //UI_searchresults(_results_list);
               }
               catch (e){
                alert(`C'é stato un errore di comunicazione con il server, ti invitiamo a provare piú tardi o a contattare l'assistenza`);
               }
           });
   }
   
   
   search(_qry, 0);
    
});