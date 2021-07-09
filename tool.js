$(document).ready(function(){
   let _PATH ='https://flask-app-sp9di.ondigitalocean.app/'; //  'http://127.0.0.1:5000/';//
   let _results_list = [[0,'zero',0],[1,'uno',0],[2,'due',0],[3,'tre',0]];
   //_qry = 'data protection and privacy'; //FOR DEBUG
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
   
   function load_placeholder(obj){ //Attiva nel container obj, da chiamare prima della funzione
        let pos = $(obj).offset();
        let width = $(obj).css('width');
        let height = $(obj).css('height');
        $('#replace').css({top: pos.top, left: pos.left, width: width, height: height});
    }
   function close_placeholder(){ //Disattiva, da chiamare a fine funzione. Occhio alle async end_place
        $('#replace').css({top: -1000, left: -1000, width: 0, height: 0});
    }

   function UI_searchresults(list){
       str = '';
       for (el of list){
		    nome = el[1];
			str += `<tr id='L_${el[0]}' style='display:${is_in(el[0])? 'none':''}'>
                      <td>${nome}</td>
                      <td style="text-align:center"><button type="button" class="btn btn-light info" style="padding: 5px;" data-toggle="tooltip" data-placement="bottom" title="Leggi"><i class="far fa-question-circle"></i></button></td>
                      <td style="text-align:center"><button type="button" class="btn btn-light move" style="padding: 5px;" data-toggle="tooltip" data-placement="bottom" title="Inserisci nel report"><i class="fas fa-arrow-circle-right"></i></button></td>
                    </tr>`;
		   
       }
       $(`#col_sx`).html(str);
       
       $(`.move`).click(function(){
           let id = $(this).parent().parent().attr('id').split('_')[1];
           $(`#col_dx`).prepend(UI_row_dx(id));
           $(this).parent().parent().hide();
           _my_report.push(id);
		   const index = _NR.indexOf(id);//Add to relevant documents or remove from not relevant
		   if (index > -1) {
				_NR.splice(index, 1);
		   }
		   else{
				_R.push(id);
		   } 
		   if($(`#dynamicSearch`).data('state')!=0)
			search(_enc_qry, $(`#expandSearch`).data('state'), $(`#dynamicSearch`).data('state'));
		   $(`.remove`).off('click');
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
                    _NR.push(id);
                }
				if($(`#dynamicSearch`).data('state')!=0)
					search(_enc_qry, $(`#expandSearch`).data('state'), $(`#dynamicSearch`).data('state'));
           });
		   $(`.info`).off('click');
           $(`.info`).click(function(){
               let id = $(this).parent().parent().attr('id').split('_')[1];
               UI_infobox(id);
           });
           
       });
	   $(`.info`).off('click');
       $(`.info`).click(function(){
           let id = $(this).parent().parent().attr('id').split('_')[1];
           UI_infobox(id);
       });
       close_placeholder();
   }
   
   function UI_row_dx(id){
        return `<tr id='R_${id}'>
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
        $.ajax({
            url: _PATH+'encode',
            data: data,
			method:'POST',
			async:false,
            success: function(ret){
                try {
                    _enc_qry = ret;
                }
                catch (e){
                    alert(`C'é stato un errore di comunicazione con il server, ti invitiamo a provare piú tardi o a contattare l'assistenza`);
                }
		}});
   }

   function is_in(id){
	   for (el of _my_report){
		   if (el==id)
			   return true
	   }
	   return false
   }

   /*---- Info BOX ----*/
   function UI_infobox(id){
       data={}
       data.id=id
       $.post(
           _PATH+'get_info',
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
       if(is_in(id)) $(`#info_insert`).text('Rimuovi');
       else $(`#info_insert`).text('Inserisci');
   }
   $(`#info_link`).click(function(){
        let link = $(this).data('href');
        window.open(link, 'GDPR');
    });
   $(`#info_insert`).click(function(){
        let id = $(this).data('id');
        if(!is_in(id))  $(`#L_${id}`).children().eq(2).children().click();
        else    $(`#R_${id}`).children().eq(2).children().click();
            
        $(`#readModal`).modal('hide');
    });
   
    function search(enc, inc, dyn=0){
       load_placeholder($('#col_sx').parent().parent());
       data = {};
       data.enc = JSON.stringify(enc);
       data.inc = inc;
       data.dyn = dyn;
       if (dyn)
        data.R = JSON.stringify(_R);
        data.NR = JSON.stringify(_NR);
       $.post(
           _PATH+'search',
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
                close_placeholder();
               }
               catch (e){
                alert(`C'é stato un errore di comunicazione con il server, ti invitiamo a provare piú tardi o a contattare l'assistenza`);
               }
           });
   }
   
   
    
});