let form;
let input_text;
let input_parse;
let input_department;
let input_university;
let input_faculty;
let input_conf_font;
let input_author;
let input_id;
let input_abstract;
let input_abs_key;
let input_url;
let input_title;
let skrip_input;
let preview_output;
let btn_font_up;
let btn_font_down;
let btn_frame;
let btn_live;
let btn_code;
let code_panel;
let preview_panel;

let save_btn;
let skrip_d;
let skripd_link;
let skripd_autosave;
let skripd_token;

let conn_status;
let temp_conn_status;
let conn_bool;

let university,faculty,department;
let temp_text;

$(document).ready(()=>{

    form              = $('#form').get(0);
    input_text        = $('#text-val').get(0);
    input_parse       = $('#parse-val').get(0);
    input_department  = $('#department-val').get(0);
    input_university  = $('#university-val').get(0);
    input_faculty     = $('#faculty-val').get(0);
    input_author      = $('#author-val').get(0);
    input_id          = $('#id-val').get(0);
    input_abstract    = $('#abstract-val').get(0);
    input_abs_key     = $('#abstract-key-val').get(0);
    input_title       = $('#title-val').get(0);
    input_url         = $('#url-val').get(0);
    input_conf_font   = $('#conf-font-val').get(0);
    skrip_input       = $('#skrip').get(0);
    preview_output    = $('#preview-skrip').get(0);

    code_panel        = $('#panel-1').get(0);
    preview_panel     = $('#panel-2').get(0);

    btn_font_up       = $('#btn-font-up').get(0);
    btn_font_down     = $('#btn-font-down').get(0);
    btn_live          = $('#btn-display-live').get(0);
    btn_code          = $('#btn-display-code').get(0);

    btn_frame         = $('#btn-frame').get(0);

    conn_status       = $('#connection-status').get(0);
    conn_bool         = false;

    save_btn          = $('#save').get(0);
    skrip_d           = new Skripdown('','');
    skripd_link       = $('meta[name=skripd_f_words]').attr('content');
    skripd_autosave   = $('meta[name=skripd_autosave]').attr('content');
    skripd_token      = $('meta[name=skripd_token]').attr('content');

    temp_conn_status  = '';

    $(save_btn).click(()=>{
        temp_text = $(skrip_input).html();
        const dept = skrip_d.getDepartment();
        const fclt = skrip_d.getFaculty();
        const univ = skrip_d.getUniversity();
        const auth = skrip_d.getAuthor();
        const id   = skrip_d.getId();
        const abst = skrip_d.getAbstract();
        const ttle = skrip_d.getTitle();
        $(input_text).val(temp_text);
        $(input_department).val(dept);
        $(input_faculty).val(fclt);
        $(input_university).val(univ);
        $(input_author).val(auth);
        $(input_id).val(id);
        $(input_abstract).val(abst);
        $(input_abs_key).val('no abstract key');
        $(input_title).val(ttle);
        $(input_conf_font).val($(skrip_input).data('font-editor'));
        $(form).submit();
    });

    $(btn_font_up).click(()=>{
        let size = parseInt($(skrip_input).data('font-editor'));
        if (size < 28) {
            size += 4;
            $(skrip_input).css('font-size',size+'pt');
            $(skrip_input).data('font-editor',size+'');
        }
    });

    $(btn_font_down).click(()=>{
        let size = parseInt($(skrip_input).data('font-editor'));
        if (size > 12) {
            size -= 4;
            $(skrip_input).css('font-size',size+'pt');
            $(skrip_input).data('font-editor',size+'');
        }
    });

    $(skrip_input).keydown(e=>{
        if ($(input_url).val() !== 'none') {
            const code = e.keyCode;
            if (code !== 37 && code !== 38 && code !== 39 && code !== 40) {
                if ($(conn_status).html() !== '<span class="text-info">Mengetik...</span>')
                    $(conn_status).html('<span class="text-info">Mengetik...</span>');
            }
        }
    });

    $(btn_live).click(()=>{
        $(btn_live).addClass('d-none');
        $(btn_code).removeClass('d-none');
        $(code_panel).removeClass('col-xl-12');
        $(code_panel).removeClass('col-lg-12');
        $(code_panel).removeClass('col-m-12');
        $(code_panel).removeClass('mr-auto');
        $(code_panel).removeClass('ml-auto');
        $(code_panel).addClass('col-6');
        $(preview_panel).removeClass('d-none');
    });

    $(btn_code).click(()=>{
        $(btn_code).addClass('d-none');
        $(btn_live).removeClass('d-none');
        $(code_panel).addClass('col-xl-12');
        $(code_panel).addClass('col-lg-12');
        $(code_panel).addClass('col-m-12');
        $(code_panel).addClass('mr-auto');
        $(code_panel).addClass('ml-auto');
        $(code_panel).removeClass('col-6');
        $(preview_panel).addClass('d-none');
    });

    $(skrip_input).keyup(e=>{
        console.log($(input_url).val());
        const code = e.keyCode;
        if (code !== 37 && code !== 38 && code !== 39 && code !== 40) {
            if ($(input_url).val() !== 'none') {
                $(input_text).val(skrip_input.innerHTML);
                $(input_parse).val(skrip_d.parse(skrip_input.innerText+'\n'));
                setTimeout(()=>{
                    if ($(conn_status).html() !== '<span class="text-info">Mengetik...</span>'
                        && $(conn_status).html() !== '<span class="text-info">Menyimpan...</span>')
                        $(conn_status).html('<span class="text-info">Menyimpan...</span>');
                    $.ajax({
                        type    : 'POST',
                        url     : ''+skripd_autosave+'',
                        data    : {
                            _token       : skripd_token,
                            title        : skrip_d.getTitle(),
                            author       : skrip_d.getAuthor(),
                            id_          : skrip_d.getId(),
                            abstract     : skrip_d.getAbstract(),
                            abstract_key : 'none',
                            text         : $(skrip_input).html(),
                            university   : skrip_d.getUniversity(),
                            department   : skrip_d.getDepartment(),
                            faculty      : skrip_d.getFaculty(),
                            parse        : skrip_d.getParsed(),
                            url          : $(input_url).val(),
                            conf_font    : $(input_conf_font).val()
                        }
                    });
                },500);
            }
        }
    });

    $(btn_frame).click(()=>{
        $(skrip_input).html('//start writing now. 😉<br>' +
            '//SKRIPDOWN : fast end thesis writing<br>' +
            '//this is a comment<br>' +
            '<br>' +
            '@title : document title<br>' +
            '@author : your name<br>' +
            '@id : your student id<br>' +
            '@university : your university<br>' +
            '@faculty : your faculty<br>' +
            '@department : your department<br>' +
            '<br>' +
            '//delete @majoring line if none<br>' +
            '@majoring : your majoring<br>' +
            '<br>' +
            '//set document watermark (on | off)<br>' +
            '@watermark : on<br>' +
            '<br>' +
            '//set document preface (basmallah | default)<br>' +
            '@preface : default<br>' +
            '<br>' +
            '//citation format<br>' +
            '@citation : APA<br>' +
            '@date : 19 08 2020<br>' +
            '@location : your location<br>' +
            '<br>' +
            'bab i<br>' +
            '# latar belakang<br>' +
            '# rumusan masalah<br>' +
            '# tujuan penelitian<br>' +
            '<br>' +
            '//remove \'# batasan masalah\' and \'# manfaat penelitian\' if you don\'t need it<br>' +
            '# batasan masalah<br>' +
            '# manfaat penelitian<br>' +
            '<br>' +
            'bab ii<br>' +
            '//sub heading #, #2, #3, . . . , #6 for level 1 to 6<br>' +
            '# sub heading 1<br>' +
            '<br>' +
            'bab iii<br>' +
            '# penelitian terdahulu<br>' +
            '<br>' +
            'bab iv<br>' +
            '# bahasan<br>' +
            '<br>' +
            'bab v<br>' +
            'kesimpulan dari penelitan tulis sendiri');
    });

});

window.setInterval(()=>{
    const temp = skrip_d.update_foreign_word();
        $.ajax({
            type    : 'POST',
            url     : ''+skripd_link+'',
            data    : {_token:skripd_token,foreign_word:temp[0],translate_word:temp[1]},
            success : data=>{
                skrip_d.set_foreign_word(data.foreign_word,data.translate_word);
                temp_conn_status = '';
                $(conn_status).html(temp_conn_status);
                $(skrip_input).removeClass('muted');
                $(skrip_input).attr('contenteditable','true');
                conn_bool = true;
            },
            error: ()=>{
                temp_conn_status = '<span class="bg-danger text-white p-1 rounded">Tidak Terhubung !</span>';
                $(skrip_input).addClass('muted');
                $(skrip_input).attr('contenteditable','false');
                $(conn_status).html(temp_conn_status);
                conn_bool = false;
            }
        });
},1000);
