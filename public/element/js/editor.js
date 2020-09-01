let form;
let input_text;
let input_parse;
let input_department;
let input_university;
let input_faculty;
let input_conf_font;
let skrip_input;
let btn_font_up;
let btn_font_down;

let save_btn;
let skrip_d;
let skripd_link;
let skripd_token;

let university,faculty,department;
let temp_text;

$(document).ready(()=>{

    form              = $('#form').get(0);
    input_text        = $('#text-val').get(0);
    input_parse       = $('#parse-val').get(0);
    input_department  = $('#department-val').get(0);
    input_university  = $('#university-val').get(0);
    input_faculty     = $('#faculty-val').get(0);
    input_conf_font   = $('#conf-font-val').get(0);
    skrip_input       = $('#skrip').get(0);

    btn_font_up       = $('#btn-font-up').get(0);
    btn_font_down     = $('#btn-font-down').get(0);

    save_btn          = $('#save').get(0);
    skrip_d           = new Skripdown('','');
    skripd_link       = $('meta[name=skripd_f_words]').attr('content');
    skripd_token      = $('meta[name=skripd_token]').attr('content');

    $(save_btn).click(()=>{
        temp_text = $(skrip_input).html();
        let temp;
        if ((temp = /^ *@university *: *([\w\S ]+) *$/m.exec(temp_text)) != null)
            university = temp[1];
        else
            university = 'Universitas Muhammadiyah Malang';
        if ((temp = /^ *@faculty *: *([\w\S ]+) *$/m.exec(temp_text)) != null)
            faculty = temp[1];
        else
            faculty = 'Teknik';
        if ((temp = /^ *@department *: *([\w\S ]+) *$/m.exec(temp_text)) != null)
            department = temp[1];
        else
            department = 'Informatika';
        $(input_text).val(temp_text);
        $(input_department).val(department);
        $(input_faculty).val(faculty);
        $(input_university).val(university);
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

    $(skrip_input).keyup(e=>{
        const code = e.keyCode;
        if (code !== 37 && code !== 38 && code !== 39 && code !== 40) {
            $(input_text).val(skrip_input.innerHTML);
            $(input_parse).val(skrip_d.parse(skrip_input.innerText+'\n'));
        }
    });

});

window.setInterval(()=>{
    const temp = skrip_d.update_foreign_word();
        $.ajax({
            type    : 'POST',
            url     : ''+skripd_link+'',
            data    : {_token:skripd_token,foreign_word:temp[0],translate_word:temp[1]},
            success : data=>{
                console.log(data.foreign_word);
                skrip_d.set_foreign_word(data.foreign_word,data.translate_word);
            }
        });
},1000);
