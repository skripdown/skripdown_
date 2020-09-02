class Skripdown {

    constructor(for_words, trans_words) {
        this.title      = '';
        this.author     = '';
        this.id         = '';
        this.faculty    = '';
        this.department = '';
        this.university = '';
        this.abstract   = '';
        this.abs_key    = '';
        this.set_foreign_word(for_words, trans_words);
    }

    parse(input) {

        let /*meta value*/
            $title_value            = 'untitled',
            $citation_value         = 'APA',
            $location_value         = 'MALANG',
            $author_value           = 'noname',
            $id_value               = 'noid',
            $email_value            = 'nomail@mail.dev',
            $department_value       = 'department',
            $university_value       = 'university',
            $faculty_value          = 'faculty',
            $majoring_value         = 'majoring',
            $date_value             = date(),
            $year_value             = 'undefined',
            $preface_value          = 'default',
            $watermark_value        = 'on',
            $dosen_i_name_value     = 'noname',
            $dosen_ii_name_value    = 'noname',
            $dosen_i_id_value       = 'noid',
            $dosen_ii_id_value      = 'noid',
            $abstract_value         = '',
            $abstract_key_value     = '',
            $lem_persetujuan_value  = '',
            $lem_pengesahan_value   = '',
            $lem_pernyataan_value   = '';

        let foreign_regex           = this.foreign_regex;
        let foreign_regex_inv       = this.foreign_regex_inv;

        function autocorrect(text) {
            let temp;
            while ((temp = foreign_regex.exec(text)) != null && foreign_regex_inv.exec(text) == null) {
                text = text.replace(temp[1],'<em>'+temp[1]+'</em>');
            }
            return text;
        }

        function date(day, month, year) {
            if (day === null) {
                const date   = new Date();
                const year_  = date.getFullYear();
                const month_ = date.getMonth();
                const day_   = date.getDay();
                let m;
                if (month_ === 1) {
                    m = 'Januari';
                }
                else if (month_ === 2) {
                    m = 'Februari';
                }
                else if (month_ === 3) {
                    m = 'Maret';
                }
                else if (month_ === 4) {
                    m = 'April';
                }
                else if (month_ === 5) {
                    m = 'Mei';
                }
                else if (month_ === 6) {
                    m = 'Juni';
                }
                else if (month_ === 7) {
                    m = 'Juli';
                }
                else if (month_ === 8) {
                    m = 'Agustus';
                }
                else if (month_ === 9) {
                    m = 'September';
                }
                else if (month_ === 10) {
                    m = 'Oktober';
                }
                else if (month_ === 11) {
                    m = 'November';
                }
                else {
                    m = 'Desember';
                }

                return day_+" "+m+" "+year_;
            }
            else {
                if (month === '1' || month === '01') return day+" Januari "+year;
                else if (month === '2' || month === '02') return day+" Februari "+year;
                else if (month === '3' || month === '03') return day+" Maret "+year;
                else if (month === '4' || month === '04') return day+" April "+year;
                else if (month === '5' || month === '05') return day+" Mei "+year;
                else if (month === '6' || month === '06') return day+" Juni "+year;
                else if (month === '7' || month === '07') return day+" Juli "+year;
                else if (month === '8' || month === '08') return day+" Agustus "+year;
                else if (month === '9' || month === '09') return day+" September "+year;
                else if (month === '10') return day+" Oktober "+year;
                else if (month === '11') return day+" November "+year;
                else return day+" Desember "+year;
            }
        }

        function inline(raw) {

            let result;

            raw = raw.replace(/\n\n+/gm, '\n\n');
            raw = raw.replace(/[ \u00A0][ \u00A0]*/gm, ' ');
            raw = raw.replace(/^\/\/[\w\S ]*$/gm, '');

            while ((result = /\*\*([^~][ \w\S]+)\*\*/gm.exec(raw)) != null) {
                raw = raw.replace('**'+result[1]+'**','<b>'+result[1]+'</b>');
            }

            while ((result = /\*([^~][ \w\S]+)\*/gm.exec(raw)) != null) {
                raw = raw.replace('*'+result[1]+'*','<em>'+result[1]+'</em>');
                if (!this.vocabularity.has(result[1])) {
                    this.vocabularity.set(result[1],'0');
                    this.raw_foreign        += ('|'+result[1]);
                    this.raw_trans          += ('|0');
                    this.foreign_regex      = null;
                    this.foreign_regex      = new RegExp('\b('+this.raw_foreign+')\b','i');
                    this.foreign_regex_inv  = new RegExp('<em>('+this.raw_foreign+')<\/em>','i');
                    foreign_regex           = this.foreign_regex;
                    foreign_regex_inv       = this.foreign_regex_inv;
                }
            }

            while ((result = /__([^~][ \w\S]+)__/gm.exec(raw)) != null) {
                raw = raw.replace('__'+result[1]+'__','<u>'+result[1]+'</u>');
            }

            while ((result = /\$([A-z][\w]*)/g.exec(raw)) != null) {
                raw = raw.replace('$'+result[1],'<span class="var-'+result[1]+'"></span>');
            }

            while ((result = /" *\r?\n? *\["([A-z0-9_]+)]/gm.exec(raw)) != null) {
                raw = raw.replace(/" *\r?\n? *\["([A-z0-9_]+)]/gm,"\" ##C-B-"+result[1]+"##");
            }

            while ((result = /\["([A-z0-9_]+)]/gm.exec(raw)) != null) {
                raw = raw.replace(/\["([A-z0-9_]+)]/gm,"##C-F-"+result[1]+"##");
            }

            while ((result = /\['([A-z0-9_]+)]/gm.exec(raw)) != null) {
                raw = raw.replace(/\['([A-z0-9_]+)]/gm,"##C-I-"+result[1]+"##");
            }

            return raw.split(/\n/);
        }

        function lex(raw) {
            const synt_meta         = /^[ \u00A0]*(@[\w\S ']+)[ \u00A0]*$/m;
            const synt_bab          = /^ *bab (i|ii|iii|iv|v) *$/m;
            const synt_sub          = /^ *(#|#2|#3|#4|#5|#6) +([\w,. )(</>]+) *$/m;
            const synt_image        = /^ *img\[([\w\S ]+)] *\(([\w\S ]+)\) *(xs|sm|md|lg|xl)? *$/m;
            const synt_table_head   = /^ *\|([\w\S ]+)\| *\(([\w\S ]+)\) *(xs|sm|md|lg|xl)? *$/m;
            const synt_section      = /^ *(present page|abstract id|abstract en|attachment) *$/m;
            const synt_reference    = /^[ \u00A0]*\[([A-z0-9_]+)][ ]*cite[ ]*(BOOK|JOURNAL)[ ]*with[ \u00A0]*$/m;
            const synt_list         = /^ *(1\. |a\) |> |\* |- )([\w\S][\w\S ]*)$/m;
            const synt_att_list     = /^[ \u00A0]*attachment[ ]*([\w\S ]+)[ \u00A0]*$/m;
            const parag_break       = /^[ \u00A0]*$/m;


            let variable_map        = [];
            let variable_value      = [];
            let reg_bab_value       = [];
            let reg_sub_value       = [];
            let reg_img_value       = [];
            let reg_tbl_value       = [];
            let reg_sub_level       = [];
            let reg_bab_html        = [];
            let reg_sub_html        = [];
            let reg_parag_html      = [];
            let reg_img_html        = [];
            let reg_tbl_html        = [];
            let reg_lis_html        = [];
            let reg_section         = [];
            let reg_att_value       = [];
            let reg_att_html        = [];
            let reg_citation        = new Map();
            let pattern             = [];
            let markup;
            let result;

            for (let i = 0; i < raw.length; i++) {
                if ((result = synt_meta.exec(raw[i])) != null) {
                    if ((result = /^[ ]*@title[ ]*:[ ]*([\w,. )(</>]+)[ ]*$/m.exec(raw[i])) != null) {
                        $title_value = autocorrect(result[1]);
                    }
                    else if ((result = /^[ ]*@citation[ ]*:[ ]*(APA)[ ]*$/m.exec(raw[i])) != null) {
                        $citation_value = result[1];
                    }
                    else if ((result = /^[ ]*@location[ ]*:[ ]*([A-z]['A-z0-9 ]+)[ ]*$/m.exec(raw[i])) != null) {
                        $location_value = result[1];
                    }
                    else if ((result = /^[ ]*@author[ ]*:[ ]*([A-z]['A-z0-9 ]+)[ ]*$/m.exec(raw[i])) != null) {
                        $author_value = result[1];
                    }
                    else if ((result = /^[ ]*@id[ ]*:[ ]*([\w]+)[ ]*$/m.exec(raw[i])) != null) {
                        $id_value = result[1];
                    }
                    else if ((result = /^[ ]*@email[ ]*:[ ]*([\w]+@[\w]+\.[A-z]+)[ ]*$/m.exec(raw[i])) != null) {
                        $email_value = result[1];
                    }
                    else if ((result = /^[ ]*@department[ ]*:[ ]*([A-z]['A-z0-9 ]+)[ ]*$/m.exec(raw[i])) != null) {
                        $department_value = result[1];
                    }
                    else if ((result = /^[ ]*@majoring[ ]*:[ ]*([A-z]['A-z0-9 ]+)[ ]*$/m.exec(raw[i])) != null) {
                        $majoring_value = result[1];
                    }
                    else if ((result = /^[ ]*@university[ ]*:[ ]*([A-z]['A-z0-9 ]+)[ ]*$/m.exec(raw[i])) != null) {
                        $university_value = result[1];
                    }
                    else if ((result = /^[ ]*@faculty[ ]*:[ ]*([A-z]['A-z0-9 ]+)[ ]*$/m.exec(raw[i])) != null) {
                        $faculty_value = result[1];
                    }
                    else if ((result = /^[ ]*@date[ ]*:[ ]*(\d{1,2})[,\- ](\d{1,2})[,\- ](\d\d\d\d)[ ]*$/m.exec(raw[i])) != null) {
                        $date_value = date(result[1],result[2],result[3]);
                        $year_value = result[3];
                    }
                    else if ((result = /^[ ]*@dosen_i[ ]*:[ ]*([\w .,]+)[ ]*&[ ]*([\d]+)$/m.exec(raw[i])) != null) {
                        $dosen_i_name_value = result[1];
                        $dosen_i_id_value = result[2];
                    }
                    else if ((result = /^[ ]*@dosen_ii[ ]*:[ ]*([\w .,]+)[ ]*&[ ]*([\d]+)$/m.exec(raw[i])) != null) {
                        $dosen_ii_name_value = result[1];
                        $dosen_ii_id_value = result[2];
                    }
                    else if ((result = /^[ ]*@preface[ ]*:[ ]*(basmallah|default)[ ]*$/m.exec(raw[i])) != null) {
                        $preface_value = result[1];
                    }
                    else if ((result = /^[ ]*@watermark[ ]*:[ ]*(on|off)[ ]*$/m.exec(raw[i])) != null) {
                        $watermark_value = result[1];
                    }
                    else if ((result = /^[ ]*@keyword[ ]*:[ ]*(on|off)[ ]*$/m.exec(raw[i])) != null) {
                        $abstract_key_value = result[1];
                    }
                    else if ((result = /^[ \u00A0]*@persetujuan[ \u00A0]*:[ \u00A0]*([\w\S]+)[ \u00A0]*$/m.exec(raw[i])) != null) {
                        $lem_persetujuan_value = result[1];
                    }
                    else if ((result = /^[ \u00A0]*@pengesahan[ \u00A0]*:[ \u00A0]*([\w\S]+)[ \u00A0]*$/m.exec(raw[i])) != null) {
                        $lem_pengesahan_value = result[1];
                    }
                    else if ((result = /^[ \u00A0]*@pernyataan[ \u00A0]*:[ \u00A0]*([\w\S]+)[ \u00A0]*$/m.exec(raw[i])) != null) {
                        $lem_pernyataan_value = result[1];
                    }
                }
                else if ((result = synt_bab.exec(raw[i])) != null) {
                    if (result[1] === 'i') {
                        reg_bab_value.push(1);
                        markup = '<div id="bab-i" class="bab"></div><span id="set-bab-i"></span>';
                    }
                    else if (result[1] === 'ii') {
                        reg_bab_value.push(2);
                        markup = '<div id="bab-ii" class="bab"></div><span id="set-bab-ii"></span>';
                    }
                    else if (result[1] === 'iii') {
                        reg_bab_value.push(3);
                        markup = '<div id="bab-iii" class="bab"></div><span id="set-bab-iii"></span>';
                    }
                    else if (result[1] === 'iv') {
                        reg_bab_value.push(4);
                        markup = '<div id="bab-iv" class="bab"></div><span id="set-bab-iv"></span>';
                    }
                    else if (result[1] === 'v') {
                        reg_bab_value.push(5);
                        markup = '<div id="bab-v" class="bab"></div><span id="set-bab-v"></span>';
                    }
                    markup = markup
                        + '<span class="reset-sub"></span><span class="reset-img"></span><span class="reset-tbl"></span>'
                        + '<span class="reset-alpha-ls"></span><span class="reset-num-ls"></span><span class="reset-ref-ls"></span>';
                    reg_bab_html.push(markup);
                    pattern.push('1');
                }
                else if ((result = synt_sub.exec(raw[i])) != null) {
                    if (result[1] === '#') {
                        reg_sub_level.push(1);
                        markup = '<div id="##REP-ID##" class="sub-1 sub">'+autocorrect(result[2])+'</div>';
                    }
                    else if (result[1] === '#2') {
                        reg_sub_level.push(2);
                        markup = '<div id="##REP-ID##" class="sub-2 sub">'+autocorrect(result[2])+'</div>';
                    }
                    else if (result[1] === '#3') {
                        reg_sub_level.push(3);
                        markup = '<div id="##REP-ID##" class="sub-3 sub">'+autocorrect(result[2])+'</div>';
                    }
                    else if (result[1] === '#4') {
                        reg_sub_level.push(4);
                        markup = '<div id="##REP-ID##" class="sub-4 sub">'+autocorrect(result[2])+'</div>';
                    }
                    else if (result[1] === '#5') {
                        reg_sub_level.push(5);
                        markup = '<div id="##REP-ID##" class="sub-5 sub">'+autocorrect(result[2])+'</div>';
                    }
                    else {
                        reg_sub_level.push(6);
                        markup = '<div id="##REP-ID##" class="sub-6 sub">'+autocorrect(result[2])+'</div>';
                    }
                    reg_sub_value.push(result[2]);
                    reg_sub_html.push(markup);
                    pattern.push('2');
                }
                else if ((result = synt_image.exec(raw[i])) != null) {

                    function setImgSize(input) {
                        if (input === 'xs') return 'img-xs';
                        if (input === 'sm') return 'img-sm';
                        if (input === 'md') return 'img-md';
                        if (input === 'lg') return 'img-lg';
                        if (input === 'xl') return 'img-xl';
                        return 'img-md';
                    }

                    const imageSize = setImgSize(result[3]);
                    const temp = autocorrect(result[2]);
                    markup = '<div id="##REP-ID##" class="image">'
                        + '<img class="'+imageSize+'" src="'+result[1]+'" alt="">'
                        + '<div class="image-dsc">'+temp+'</div></div>';
                    reg_img_html.push(markup);
                    reg_img_value.push(temp);
                    pattern.push('3');
                }
                else if ((result = synt_table_head.exec(raw[i])) != null) {

                    function setTableSize(input) {
                        if (input === 'xs') return 'tbl-xs';
                        if (input === 'sm') return 'tbl-sm';
                        if (input === 'md') return 'tbl-md';
                        if (input === 'lg') return 'tbl-lg';
                        if (input === 'xl') return 'tbl-xl';
                        return 'tbl-md';
                    }

                    function constructTableSpan(input) {
                        let row         = '';
                        input           = input.split('|');
                        const max       = 120;
                        const amount    = input.length;
                        const each      = max / amount;
                        let col_exp     = 0;
                        let col_shr     = amount;
                        for (let loop = 0; loop < input.length; loop++) {
                            if (input[loop].charAt(0) === '>') {
                                col_exp++;
                                col_shr--;
                            }
                        }
                        if (col_exp > 0) {
                            const shrink = each / 2;
                            const expand = (max - col_shr * shrink) / col_exp;
                            for (let loop = 0; loop < input.length; loop++) {
                                if (input[loop].charAt(0) === '>') {
                                    row += '<td colspan="'+expand+'">'+autocorrect(input[loop].substring(1,input[loop].length))+'</td>';
                                }
                                else {
                                    row += '<td colspan="'+shrink+'">'+autocorrect(input[loop])+'</td>';
                                }
                            }
                        }
                        else {
                            for (let loop = 0; loop < input.length; loop++) {
                                row += '<td colspan="'+each+'">'+autocorrect(input[loop])+'</td>';
                            }
                        }
                        return '<tr>'+row+'</tr>';
                    }

                    const size              = setTableSize(result[3]);
                    const desc              = autocorrect(result[2]);
                    const table_desc        = '<div class="table-dsc">'+desc+'</div>';
                    const synt_table_row    = /^[ ]*\|([\w,. )(</>|]+)\|[ ]*$/m;
                    let table_data          = constructTableSpan(result[1]);
                    while (i+1 < raw.length && (result = synt_table_row.exec(raw[i+1])) != null) {
                        table_data += constructTableSpan(result[1]);
                        i++;
                    }
                    table_data = '<table class="'+size+'">'+table_data+'</table>';
                    markup     = '<div id="##REP-ID##" class="table">'+table_desc+table_data+'</div>';
                    reg_tbl_value.push(desc);
                    reg_tbl_html.push(markup);
                    pattern.push('4');
                }
                else if ((result = synt_list.exec(raw[i])) != null) {
                    if (result[1] === '1. ') {
                        markup = '<div class="ls-num">'+autocorrect(result[2])+'</div>';
                        while (i+1 < raw.length && (result = /^1\. ([\w\S][\w\S ]*)$/m.exec(raw[i+1])) != null) {
                            markup += '<div class="ls-num">'+autocorrect(result[1])+'</div>';
                            i++;
                        }
                        markup += '<span class="reset-num-ls"></span>';
                    }
                    else if (result[1] === 'a) ') {
                        markup = '<div class="ls-alpha">'+autocorrect(result[2])+'</div>';
                        while (i+1 < raw.length && (result = /^[ ]*a\) [ ]*([\w,. )(</>]+)$/m.exec(raw[i+1])) != null) {
                            markup += '<div class="ls-alpha">'+autocorrect(result[1])+'</div>';
                            i++;
                        }
                        markup += '<span class="reset-alpha-ls"></span>';
                    }
                    else if (result[1] === '> ') {
                        markup = '<div class="ls-arrow">'+autocorrect(result[2])+'</div>';
                        while (i+1 < raw.length && (result = /^[ ]*> [ ]*([\w,. )(</>]+)$/m.exec(raw[i+1])) != null) {
                            markup += '<div class="ls-arrow">'+autocorrect(result[1])+'</div>';
                            i++;
                        }
                    }
                    else if (result[1] === '* ') {
                        markup = '<div class="ls-dot">'+autocorrect(result[2])+'</div>';
                        while (i+1 < raw.length && (result = /^[ ]*\* [ ]*([\w,. )(</>]+)$/m.exec(raw[i+1])) != null) {
                            markup += '<div class="ls-dot">'+autocorrect(result[1])+'</div>';
                            i++;
                        }
                    }
                    else {
                        markup = '<div class="ls-dash">'+autocorrect(result[2])+'</div>';
                        while (i+1 < raw.length && (result = /^[ ]- [ ]*([\w,. )(</>]+)$/m.exec(raw[i+1])) != null) {
                            markup += '<div class="ls-dash">'+autocorrect(result[1])+'</div>';
                            i++;
                        }
                    }
                    reg_lis_html.push(markup);
                    pattern.push('5');
                }
                else if ((result = synt_section.exec(raw[i])) != null) {
                    if (result[1] === 'present page') {
                        reg_section.push(5);
                    }
                    else if (result[1] === 'abstract id') {
                        reg_section.push(3);
                    }
                    else if (result[1] === 'abstract en') {
                        reg_section.push(4);
                    }
                    else {
                        reg_section.push(2);
                    }
                    pattern.push('6');
                }
                else if ((result = synt_reference.exec(raw[i])) != null) {
                    let cite;
                    if (result[2] === 'JOURNAL') {
                        cite = new Citation(result[1],'JOURNAL',$citation_value);
                        while (i+1 < raw.length && (result = /^ *@(author|journal|year|title|volume|edit|page|doi) *: *([()'A-z0-9 \-]+) *$/gm.exec(raw[i+1])) != null) {
                            if (result[1] === 'author') cite.addAuthor(result[2]);
                            else if (result[1] === 'journal') cite.addJournal(result[2]);
                            else if (result[1] === 'year' && /\d\d\d\d/.exec(result[2]) != null) cite.addYear(result[2]);
                            else if (result[1] === 'title') cite.addTitle(result[2]);
                            else if (result[1] === 'volume') cite.addVolume(result[2]);
                            else if (result[1] === 'edit') cite.addEdit(result[2]);
                            else if (result[1] === 'page' && /\d{1,4} *- *\d{1,4}/.exec(result[2]) != null) cite.addPage(result[2]);
                            else cite.addDoi(result[2]);
                        }
                    }
                    else {
                        cite = new Citation(result[1],'BOOK',$citation_value);
                        while (i+1 < raw.length && (result = /^ *@(author|translation|publisher|title|city|year|edit|) *: *([()'A-z0-9 \-]+) *$/gm.exec(raw[i+1])) != null) {
                            if (result[1] === 'author') cite.addAuthor(result[2]);
                            else if (result[1] === 'translation' && /yes/i.exec(result[2])) cite.isTranslation();
                            else if (result[1] === 'publisher') cite.addPublisher(result[2]);
                            else if (result[1] === 'title') cite.addTitle(result[2]);
                            else if (result[1] === 'city') cite.addCity(result[2]);
                            else if (result[1] === 'year' && /\d\d\d\d/.exec(result[2]) != null) cite.addYear(result[2]);
                            else cite.addEdit(result[2]);
                        }
                    }
                    reg_citation.set(result[1],cite);
                }
                else if ((result = synt_att_list.exec(raw[i])) != null) {
                    const temp = autocorrect(result[1]);
                    markup = '<div id="##REP-ID##" class="ls-lampiran">'
                        + '<div class="ls-lampiran-logo"><img src="https://drive.google.com/thumbnail?id=1EOCSr1KSQ0ThPAx-DepjcqwL3WURRabg" alt=""></div>'
                        + '<div class="ls-lampiran-title"><div>'+temp+'</div></div></div>';
                    reg_att_html.push(markup);
                    reg_att_value.push(temp);
                    pattern.push('7');
                }
                else if ((result = parag_break.exec(raw[i])) != null) {
                    while (i+1 < raw.length && (result = parag_break.exec(raw[i+1])) != null) {
                        i++;
                    }
                    pattern.push('0');
                }
                else {
                    reg_parag_html.push(autocorrect(raw[i]));
                    pattern.push('9');
                }
            }

            pattern.push('0');

            return [
                pattern,
                variable_map,
                variable_value,
                reg_bab_value,
                reg_sub_value,
                reg_img_value,
                reg_tbl_value,
                reg_att_value,
                reg_bab_html,
                reg_sub_html,
                reg_parag_html,
                reg_img_html,
                reg_tbl_html,
                reg_lis_html,
                reg_att_html,
                reg_sub_level,
                reg_citation,
                reg_section
            ];
        }

        function construct(memory) {
            let pattern             = memory[0],
                variable_map        = memory[1],
                variable_value      = memory[2],
                reg_bab_value       = memory[3],
                reg_sub_value       = memory[4],
                reg_img_value       = memory[5],
                reg_tbl_value       = memory[6],
                reg_att_value       = memory[7],
                reg_bab_html        = memory[8],
                reg_sub_html        = memory[9],
                reg_parag_html      = memory[10],
                reg_img_html        = memory[11],
                reg_tbl_html        = memory[12],
                reg_lis_html        = memory[13],
                reg_att_html        = memory[14],
                reg_sub_level       = memory[15],
                reg_citation        = memory[16],
                reg_section         = memory[17];

            let toc_opening         = '',
                toc_content         = '',
                toc_attachment      = '';

            let img_table           = '',
                tbl_table           = '',
                att_table           = '';

            let sub_id              = 1,
                img_id              = 1,
                tbl_id              = 1,
                att_id              = 1;

            let main_content        = '',
                att_content         = '',
                pre_content         = '',
                abs_id_content      = '',
                abs_en_content      = '';

            let operand;
            let section = 0;

            let bab_ii  = false;

            if (pattern.length > 1) {
                while (pattern.length > 0) {
                    operand = pattern.shift();
                    if (operand === '1') {
                        section = 1;
                        const on_bab = reg_bab_value.shift();
                        if (on_bab === 1) {
                            bab_ii = false;
                            toc_content = toc_content
                                + '<span class="set-dfi-bab-i"></span><span class="reset-dfi-sub"></span>'
                                + '<li><span class="di-b">bab i</span><a href="#bab-i" class="con-idx"></a></li>';
                            img_table = img_table
                                + '<span class="set-dfi-bab-i"></span><span class="reset-df-gambar"></span>';
                            tbl_table = tbl_table
                                + '<span class="set-dfi-bab-i"></span><span class="reset-df-tabel"></span>';
                        }
                        else if (on_bab === 2) {
                            bab_ii = true;
                            toc_content = toc_content
                                + '<span class="set-dfi-bab-ii"></span><span class="reset-dfi-sub"></span>'
                                + '<li><span class="di-b">bab ii</span><a href="#bab-ii" class="con-idx"></a></li>';
                            img_table = img_table
                                + '<span class="set-dfi-bab-ii"></span><span class="reset-df-gambar"></span>';
                            tbl_table = tbl_table
                                + '<span class="set-dfi-bab-ii"></span><span class="reset-df-tabel"></span>';
                        }
                        else if (on_bab === 3) {
                            bab_ii = false;
                            toc_content = toc_content
                                + '<span class="set-dfi-bab-iii"></span><span class="reset-dfi-sub"></span>'
                                + '<li><span class="di-b">bab iii</span><a href="#bab-iii" class="con-idx"></a></li>';
                            img_table = img_table
                                + '<span class="set-dfi-bab-iii"></span><span class="reset-df-gambar"></span>';
                            tbl_table = tbl_table
                                + '<span class="set-dfi-bab-iii"></span><span class="reset-df-tabel"></span>';
                        }
                        else if (on_bab === 4) {
                            bab_ii = false;
                            toc_content = toc_content
                                + '<span class="set-dfi-bab-iv"></span><span class="reset-dfi-sub"></span>'
                                + '<li><span class="di-b">bab iv</span><a href="#bab-iv" class="con-idx"></a></li>';
                            img_table = img_table
                                + '<span class="set-dfi-bab-iv"></span><span class="reset-df-gambar"></span>';
                            tbl_table = tbl_table
                                + '<span class="set-dfi-bab-iv"></span><span class="reset-df-tabel"></span>';
                        }
                        else {
                            bab_ii = false;
                            toc_content = toc_content
                                + '<span class="set-dfi-bab-v"></span><span class="reset-dfi-sub"></span>'
                                + '<li><span class="di-b">bab v</span><a href="#bab-v" class="con-idx"></a></li>';
                            img_table = img_table
                                + '<span class="set-dfi-bab-v"></span><span class="reset-df-gambar"></span>';
                            tbl_table = tbl_table
                                + '<span class="set-dfi-bab-v"></span><span class="reset-df-tabel"></span>';
                        }
                        main_content += reg_bab_html.shift();
                    }
                    else if (operand === '2') {
                        if (section === 1) {
                            const level = reg_sub_level.shift();
                            const value = reg_sub_value.shift();
                            const id    = sub_id++;
                            if (level === 1) {
                                toc_content = toc_content
                                    + '<li class="di-s1 dfi-sub-i"><span>' +value
                                    + '</span><a href="#s'+id+'" class="con-idx"></a></li>';
                            }
                            else if (level === 2) {
                                toc_content = toc_content
                                    + '<li class="di-s2 dfi-sub-ii"><span>' +value
                                    + '</span><a href="#s'+id+'" class="con-idx"></a></li>';
                            }
                            else if (level === 3) {
                                toc_content = toc_content
                                    + '<li class="di-s3 dfi-sub-iii"><span>' +value
                                    + '</span><a href="#s'+id+'" class="con-idx"></a></li>';
                            }
                            else if (level === 4) {
                                toc_content = toc_content
                                    + '<li class="di-s4 dfi-sub-iv"><span>' +value
                                    + '</span><a href="#s'+id+'" class="con-idx"></a></li>';
                            }
                            else if (level === 5) {
                                toc_content = toc_content
                                    + '<li class="di-s5 dfi-sub-v"><span>' +value
                                    + '</span><a href="#s'+id+'" class="con-idx"></a></li>';
                            }
                            else {
                                toc_content = toc_content
                                    + '<li class="di-s6 dfi-sub-vi"><span>' +value
                                    + '</span><a href="#s'+id+'" class="con-idx"></a></li>';
                            }
                            main_content += (reg_sub_html.shift()).replace('##REP-ID##','s'+id);
                        }
                    }
                    else if (operand === '3') {
                        const value = reg_img_value.shift();
                        if (section === 1) {
                            const id        = img_id++;
                            img_table       += '<li class="df-gambar"><span>' +value+ '</span><a href="#i' +id+ '"></a></li>';
                            main_content    += (reg_img_html.shift()).replace('##REP-ID##','i'+id);
                        }
                        else if (section === 2) {
                            att_content     += (reg_img_html.shift()).replace('##REP-ID##','').replace('class="image"','class="image lampiran-image"');
                        }
                    }
                    else if (operand === '4') {
                        const value     = reg_tbl_value.shift();
                        if (section === 1) {
                            const id        = tbl_id++;
                            tbl_table       += '<li class="df-tabel"><span>' +value+ '</span><a href="#t'+id+'"></a></li>';
                            main_content    += (reg_tbl_html.shift()).replace('##REP-ID##','t'+id);
                        }
                        else if (section === 2) {
                            att_content     += (reg_tbl_html.shift()).replace('##REP-ID##','').replace('class="table"','class="table lampiran-tbl"');
                        }
                    }
                    else if (operand === '5') {
                        if (section === 1) {
                            main_content    += reg_lis_html.shift();
                        }
                        else if (section === 2) {
                            att_content     += reg_lis_html.shift();
                        }
                        else if (section === 5) {
                            pre_content     += reg_lis_html.shift();
                        }
                    }
                    else if (operand === '6') {
                        section = reg_section.shift();
                    }
                    else if (operand === '7') {
                        if (section === 2) {
                            const id        = att_id++;
                            const value     = reg_att_value.shift();
                            toc_attachment  += '<li><span class="di-b">lampiran '+id+ ' ' +value+ '</span><a href="#l' +id+'" class="con-idx"></a></li>';
                            att_table       += '<li class="df-lampiran"><span>'+value+'</span><a href="#l'+id+'"></a></li>';
                            att_content     += (reg_att_html.shift()).replace('##REP-ID##','l'+id);
                        }
                    }
                    else if (operand === '9') {
                        let temp = reg_parag_html.shift();
                        while ( pattern.length > 0 && pattern[0] === '9') {
                            temp += ' ' + reg_parag_html.shift();
                            pattern.shift();
                        }
                        temp = '<p>' + temp + '</p>';
                        if (section === 1) {
                            main_content += temp;
                        }
                        else if (section === 2) {
                            att_content += temp;
                        }
                        else if (section === 3) {
                            abs_id_content += temp;
                        }
                        else if (section === 4) {
                            abs_en_content += temp;
                        }
                        else if (section === 5) {
                            pre_content += temp;
                        }
                    }
                }
                let temp_img_table = '',
                    temp_tbl_table = '',
                    temp_att_table = '';

                let doc     = factory(
                    1,
                    [
                        $author_value,
                        $id_value,
                        $department_value,
                        $title_value,
                        $majoring_value,
                        $faculty_value,
                        $university_value,
                        $year_value,
                        $date_value,
                        $location_value
                    ]);
                if ($lem_persetujuan_value !== '') {
                    doc += '<div id="pg-lembar_persetujuan" class="head-count"><img src="'+$lem_persetujuan_value+'" alt=""></div>';
                    toc_opening += '<li><span class="di-b">lembar persetujuan</span><a href="#pg-lembar_persetujuan" class="pen-idx"></a></li>';
                }
                else {
                    doc += '<div id="pg-lembar_persetujuan" class="head-count"><p>Lembar Persetujuan Kosong</p></div>';
                    toc_opening += '<li><span class="di-b">lembar persetujuan</span><a href="#pg-lembar_persetujuan" class="pen-idx"></a></li>';
                }
                if ($lem_pengesahan_value !== '') {
                    doc += '<div id="pg-lembar_pengesahan" class="head-count"><img src="'+$lem_pengesahan_value+'" alt=""></div>';
                    toc_opening += '<li><span class="di-b">lembar pengesahan</span><a href="#pg-lembar_pengesahan" class="pen-idx"></a></li>';
                }
                else {
                    doc += '<div id="pg-lembar_pengesahan" class="head-count"><p>Lembar Pengesahan Kosong</p></div>';
                    toc_opening += '<li><span class="di-b">lembar pengesahan</span><a href="#pg-lembar_pengesahan" class="pen-idx"></a></li>';
                }
                if ($lem_pernyataan_value !== '') {
                    doc += '<div id="pg-lembar_pernyataan" class="head-count"><img src="'+$lem_pernyataan_value+'" alt=""></div>';
                    toc_opening += '<li><span class="di-b">lembar pernyataan</span><a href="#pg-lembar_pernyataan" class="pen-idx"></a></li>';
                }
                else {
                    doc += '<div id="pg-lembar_pernyataan" class="head-count"><p>Lembar Pernyataan Kosong</p></div>';
                    toc_opening += '<li><span class="di-b">lembar pernyataan</span><a href="#pg-lembar_pernyataan" class="pen-idx"></a></li>';
                }
                if (abs_id_content !== '') {
                    $abstract_value = abs_id_content;
                    abs_id_content = '<div id="pg-lembar_abstrak"><div class="pendahuluan-sub-title">abstrak</div>' + abs_id_content + '</div>';
                    doc += abs_id_content;
                    toc_opening += '<li><span class="di-b">abstrak</span><a href="#pg-lembar_abstrak" class="pen-idx"></a></li>';
                }
                else {
                    abs_id_content = '<div id="pg-lembar_abstrak"><div class="pendahuluan-sub-title">abstrak</div><p>Abstrak Indonesia Kosong</p></div>';
                    doc += abs_id_content;
                    toc_opening += '<li><span class="di-b">abstrak</span><a href="#pg-lembar_abstrak" class="pen-idx"></a></li>';
                }
                if (abs_en_content !== '') {
                    abs_en_content = '<div id="pg-lembar_abstract"><div class="pendahuluan-sub-title">abstract</div>' + abs_en_content + '</div>';
                    doc += abs_en_content;
                    toc_opening += '<li><span class="di-b">abstract</span><a href="#pg-lembar_abstract" class="pen-idx"></a></li>';
                }
                else {
                    abs_en_content = '<div id="pg-lembar_abstract"><div class="pendahuluan-sub-title">abstract</div><p>Abstrak Inggris Kosong</p></div>';
                    doc += abs_en_content;
                    toc_opening += '<li><span class="di-b">abstract</span><a href="#pg-lembar_abstract" class="pen-idx"></a></li>';
                }
                if ($preface_value === 'basmallah') {
                    doc += factory(2,[
                        $author_value,
                        $id_value,
                        $department_value,
                        $title_value,
                        $majoring_value,
                        $faculty_value,
                        $university_value,
                        $year_value,
                        $date_value,
                        $location_value
                    ]);
                    toc_opening += '<li><span class="di-b">kata pengantar</span><a href="#pg-kata_pengantar" class="pen-idx"></a></li>';
                }
                else {
                    doc += factory(3,[
                        $author_value,
                        $id_value,
                        $department_value,
                        $title_value,
                        $majoring_value,
                        $faculty_value,
                        $university_value,
                        $year_value,
                        $date_value,
                        $location_value
                    ]);
                    toc_opening += '<li><span class="di-b">kata pengantar</span><a href="#pg-kata_pengantar" class="pen-idx"></a></li>';
                }

                if (img_table !== '') {
                    img_table = '<div class="pendahuluan-sub-title">daftar gambar</div><ul id="daftar_gambar">' + img_table + '</ul>';
                    temp_img_table = '<li><span class="di-b">daftar gambar</span><a href="#daftar_gambar" class="pen-idx"></a></li>';
                }
                if (tbl_table !== '') {
                    tbl_table ='<div class="pendahuluan-sub-title">daftar tabel</div><ul id="daftar_tabel">' + tbl_table + '</ul>';
                    temp_tbl_table = '<li><span class="di-b">daftar tabel</span><a href="#daftar_tabel" class="pen-idx"></a></li>';
                }
                if (att_table !== '') {
                    att_table = '<div class="pendahuluan-sub-title">daftar lampiran</div><ul id="daftar_lampiran">' + att_table + '</ul>';
                    temp_att_table = '<li><span class="di-b">daftar lampiran</span><a href="#daftar_lampiran" class="pen-idx"></a></li>';
                }
                const i_t_a_table = '<div id="pg-daftar_gambar_tabel_lampiran">' +img_table+tbl_table+att_table+ '</div>';
                let ref_table = '';
                if (reg_citation.size > 0) {
                    let result;
                    let markup;
                    let cite_id = 1;
                    let temp_map = new Map();
                    let cite_obj;
                    while ((result = /##C-([FBI])-([A-z0-9_]+)##/.exec(main_content)) != null) {
                        cite_obj = reg_citation.get(result[2]);
                        if (cite_obj != null) {
                            if (!temp_map.has(result[2])) {
                                temp_map.set(result[2],cite_id);
                                cite_id++;
                            }
                            markup = '<div class="ls-ref">'+cite_obj.getReference()+'</div>';
                            if (result[1] === 'F')
                                main_content = main_content.replace('##C-F-'+result[2]+'##',cite_obj.getCite('front'));
                            else if (result[1] === 'B')
                                main_content = main_content.replace('##C-B-'+result[2]+'##',cite_obj.getCite());
                            else
                                main_content = main_content.replace('##C-I-'+result[2]+'##','['+temp_map.get(result[2])+']');
                        }
                        else {
                            markup = '';
                            main_content = main_content.replace('##-C-'+result[1]+'-'+result[2]+'##','');
                        }
                        ref_table += markup;
                        cite_obj = null;
                    }
                    ref_table = '<div id="daftar-pustaka"></div><span class="reset-ref-ls"></span>' + ref_table;
                    main_content += ref_table;
                    toc_content += '<li><span class="di-b">daftar pustaka</span><a href="#daftar-pustaka" class="con-idx"></a></li>';
                }
                if (att_content !== '') {
                    att_content = '<div id="lampiran"></div>' + att_content;
                }
                toc_opening = toc_opening + '<li><span class="di-b">daftar isi</span><a href="#pg-daftar_isi" class="pen-idx"></a></li>' + temp_img_table + temp_tbl_table + temp_att_table;
                const toc =
                    '<div id="pg-daftar_isi" class="head-count"><div class="pendahuluan-sub-title">daftar isi</div><ul>' +
                    toc_opening + toc_content + toc_attachment + '</ul></div>';
                doc = doc + toc + i_t_a_table + main_content + att_content;

                return doc;
            }
            else {
                return 'no document';
            }
        }

        function factory(type, data) {

            function cover(data) {
                let res = '<div id="cover" class="reset-head-count">'
                    + '<div id="cov-head">'
                    + data[3] + '<br><br>tugas akhir<br><br>'
                    + '</div><div>diajukan untuk memenuhi<br>'
                    + 'persyaratan guna meraih gelar sarjana strata i<br>'
                    + 'program studi '+data[2]+' '+data[6] +'</div>'
                    + '<div><img src="https://drive.google.com/thumbnail?id=1EOCSr1KSQ0ThPAx-DepjcqwL3WURRabg" alt=""></div><div>'
                    + 'oleh :<br>'
                    + '<span>'+data[0]+'</span><br>'
                    + '<span>'+data[1]+'</span><br>';

                if (data[4] !== 'majoring')
                    return res +
                        + '<span>bidang minat<br>'+data[4]+'</span><br></div><div id="cov-footer">'
                        + 'jurusan ' +data[2]+ '<br>fakultas ' +data[5]+ '<br>' +data[6]+ '<br>'
                        + data[7]+ '</div></div>';

                return res +
                    + '</div><div id="cov-footer">'
                    + 'jurusan ' +data[2]+ '<br>fakultas ' +data[5]+ '<br>' +data[6]+ '<br>'
                    + data[7]+ '</div></div>';
            }

            function kata_pengantar(data) {
                return '<div id="pg-kata_pengantar" class="head-count"><div id="pg-kata_pengantar-content">'
                    + '<div class="pendahuluan-sub-title">kata pengantar'
                    + '<img src="https://drive.google.com/thumbnail?id=1G0D919EbhGdGCsC5JN1nY0hg6ypTlkJu" alt=""></div><p>'
                    + 'Penulis memanjatkan Segala Puji Bagi Allah SWT Tuhan semesta alam dan Shalawat serta salam selalu'
                    + 'tercurahkan kepada Nabi Muhammad SAW, Penulis berhasil menyelesaikan Tugas Akhir dengan judul:</p>'
                    + '<p id="pg-kata_pengantar-judul">' +data[3]+ '</p><p>'
                    + 'Melalui kesempatan yang sangat berbahagia ini penulis menyampaikan ucapan terima kasih yang sebesar-besarnya'
                    + 'kepada semua pihak yang telah membantu dan terlibat dalam dalam penyelesaian tugas akhir ini.</p><p>'
                    + 'Peneliti menyadari bahwa dalam penulisan Tugas Akhir ini masih banyak kekurangan dan keterbatasan. Oleh'
                    + 'karena itu penulis mengharapkan saran yang  membangun agar tulisan ini bermanfaat bagi perkembangan ilmu'
                    + 'pengetahuan kedepannya.</p></div><div></div><p id="pg-kata_pengantar-info">'
                    + '<span>' +data[9]+ ', ' +data[8]+ '</span><br><br><br><br><br>'
                    + '<span>' +data[0]+ '</span></p></div>';
            }

            function kata_pengantar_def(data) {
                return '<div id="pg-kata_pengantar" class="head-count"><div id="pg-kata_pengantar-content">'
                    + '<div class="pendahuluan-sub-title">kata pengantar'
                    + '</div><p>'
                    + 'Penulis memanjatkan Segala Puji Bagi Tuhan yang maha esa sehingga'
                    + ' Penulis berhasil menyelesaikan Tugas Akhir dengan judul:</p>'
                    + '<p id="pg-kata_pengantar-judul">' +data[3]+ '</p><p>'
                    + 'Melalui kesempatan yang sangat berbahagia ini penulis menyampaikan ucapan terima kasih yang sebesar-besarnya'
                    + 'kepada semua pihak yang telah membantu dan terlibat dalam dalam penyelesaian tugas akhir ini.</p><p>'
                    + 'Peneliti menyadari bahwa dalam penulisan Tugas Akhir ini masih banyak kekurangan dan keterbatasan. Oleh'
                    + 'karena itu penulis mengharapkan saran yang  membangun agar tulisan ini bermanfaat bagi perkembangan ilmu'
                    + 'pengetahuan kedepannya.</p></div><div></div><p id="pg-kata_pengantar-info">'
                    + '<span>' +data[9]+ ', ' +data[8]+ '</span><br><br><br><br><br>'
                    + '<span>' +data[0]+ '</span></p></div>';
            }

            if (type === 1) return cover(data);
            if (type === 2) return kata_pengantar(data);
            if (type === 3) return kata_pengantar_def(data);
        }

        const result    = construct(lex(inline(input)));
        this.title      = $title_value;
        this.author     = $author_value;
        this.id         = $id_value;
        this.abstract   = $abstract_value;
        this.abs_key    = $abstract_key_value;
        this.university = $university_value;
        this.faculty    = $faculty_value;
        this.department = $department_value;
        return result;
    }

    update_foreign_word() {
        return [this.raw_foreign,this.raw_trans];
    }

    set_foreign_word(for_words,trans_words) {
        if (for_words == null || for_words === '') {
            for_words = 'online|offline';
            trans_words = 'daring|luring';
        }
        this.raw_foreign        = for_words;
        this.raw_trans          = trans_words;
        this.vocabularity       = new Map();
        this.foreign_regex      = new RegExp('\b('+for_words+')\b','i');
        this.foreign_regex_inv  = new RegExp('<em>('+for_words+')<\/em>','i');
        const foreign_word      = for_words.split('|');
        const translate_word    = trans_words.split('|');
        for (let i = 0; i < for_words.length;i++) {
            this.vocabularity.set(foreign_word[i],translate_word[i]);
        }
    }

    getTitle() {
        if (this.title === '' || this.title === 'untitled')
            return 'no title';
        return this.title;
    }

    getAuthor() {
        if (this.author === '' || this.author === 'noname')
            return 'no author';
        return this.author;
    }

    getId() {
        if (this.id === '' || this.id === 'noid')
            return 'no id';
        return this.id;
    }

    getFaculty() {
        if (this.faculty === '' || this.faculty === 'faculty')
            return 'Teknik';
        return this.faculty;
    }

    getDepartment() {
        if (this.department === '' || this.department === 'department')
            return 'Informatika';
        return this.department;
    }

    getUniversity() {
        if (this.university === '' || this.university === 'university')
            return 'Universitas Muhammadiyah Malang';
        return this.university;
    }

    getAbstract() {
        if (this.abstract === '')
            return 'no abstract';
        return this.abstract;
    }
}

class Citation {

    constructor(key,type,format) {
        this.key        = key;
        this.type       = type;
        this.format     = format;
        this.title      = 'undefined';
        this.year       = 'undefined';
        this.edit       = 'undefined';
        if (type === 'JOURNAL') {
            this.journal    = 'undefined';
            this.page       = 'undefined';
            this.doi        = 'undefined';
            this.page_start = 'undefined';
            this.volume     = 'undefined';
        }
        else if (type === 'BOOK') {
            this.publisher  = 'undefined';
            this.city       = 'undefined';
            this.translated = false;
        }
        this.author     = [];
    }

    addAuthor(name) {
        this.author.push(name);
    }

    addTitle(title) {
        this.title = title;
    }

    addJournal(journal) {
        this.journal = journal;
    }

    addYear(year) {
        this.year = year;
    }

    addVolume(volume) {
        this.volume = volume;
    }

    addEdit(edit) {
        this.edit = edit;
    }

    addPage(start, end) {
        this.page = start+'-'+end;
        this.page_start = start;
    }

    addDoi(doi) {
        this.doi = doi;
    }

    addPublisher(publisher) {
        this.publisher = publisher;
    }

    addCity(city) {
        this.city = city;
    }

    isTranslation() {
        this.translated = true;
    }

    getReference() {
        function author_name(name) {
            let format_name = name.split(' ');
            let l_name = '';
            let f_name = '';
            if (format_name.length > 1) {
                for (let i = 0; i < format_name.length;i++) {
                    if (i === format_name.length-1) {
                        l_name += format_name[i].charAt(0).toUpperCase() + format_name[i].slice(1) + ', ';
                    }
                    else {
                        f_name += format_name[i].charAt(0).toUpperCase()+'.';
                    }
                }
                return l_name+f_name;
            }
            else
                return name.charAt(0).toUpperCase()+name.slice(1);
        }

        if (this.type === 'JOURNAL') {
            if (this.format === 'APA') {
                let author  = '';
                let year    = '';
                let title   = '';
                let journal = '';
                let volume  = '';
                let page    = '';
                let doi     = '';

                if (this.author.length === 1 && this.author[0] != null) {
                    author = author_name(this.author[0]);
                }
                else if (this.author.length >1 && this.author.length < 3) {
                    author = author_name(this.author[0]) + '& ' + author_name(this.author[1]);
                }
                else if (this.author.length > 2 && this.author.length < 8) {
                    for (let i = 0; i < this.author.length; i++) {
                        if (i === this.author.length-1) {
                            author += author_name(this.author[i]);
                        }
                        else if (i === this.author.length-2) {
                            author += author_name(this.author[i]) + ', & ';
                        }
                        else {
                            author += author_name(this.author[i]) + ', ';
                        }
                    }
                }
                else if (this.author.length > 7){
                    for (let i = 0; i < this.author.length; i++) {
                        if (i === this.author.length-1) {
                            author += author_name(this.author[i]);
                        }
                        else {
                            author += author_name(this.author[i]) + ', ';
                        }
                    }
                }

                if (this.year !== 'undefined') {
                    year = '('+this.year+'). ';
                }
                if (this.title !== 'undefined') {
                    title = this.title+'. ';
                }
                if (this.journal !== 'undefined') {
                    journal = '<em>'+this.journal+'</em>. ';
                }
                if (this.volume !== 'undefined') {
                    volume = '<em>'+this.volume+'</em>';
                    if (this.edit !== 'undefined') {
                        volume += '('+this.edit+')';
                    }
                    volume += ', '
                }
                if (this.page !== 'undefined') {
                    page = this.page+'. ';
                }
                if (this.doi !== 'undefined') {
                    doi = this.doi;
                }

                return author+year+title+journal+volume+page+doi;
            }
        }
        if (this.type === 'BOOK') {
            let author      = '';
            let year        = '';
            let title       = '';
            let publisher   = '';
            let city        = '';

            if (this.author.length === 1 && this.author[0] != null) {
                author = author_name(this.author[0]);
            }
            else if (this.author.length === 2) {
                author = author_name(this.author[0]) + 'dan ' + author_name(this.author[1]);
            }
            else if (this.author.length === 3) {
                for (let i = 0; i < this.author.length; i++) {
                    if (i === this.author.length-1) {
                        author += author_name(this.author[i]);
                    }
                    else if (i === this.author.length-2) {
                        author += author_name(this.author[i]) + ' dan ';
                    }
                    else {
                        author += author_name(this.author[i]) + ', ';
                    }
                }
            }
            else if (this.author.length > 3) {
                author = author_name(this.author[0]) + ', dkk. ';
            }
            else {
                author = 'Anonim';
            }

            if (this.year !== 'undefined') {
                year = this.year+'. ';
            }
            if (this.title !== 'undefined') {
                title = '<em>'+this.title+'</em>. ';
            }
            if (this.publisher !== 'undefined') {
                publisher = this.publisher+'. ';
            }
            if (this.city !== 'undefined') {
                city = this.city+': ';
            }
            if (this.translated) {
                author += ' (Penterjemah).';
            }
            else {
                author += '. ';
            }

            return author+year+title+city+publisher;
        }
    }

    getCite(arrange, page) {

        function set_lastName(name) {
            if (name.split(' ').length === 1) {
                return name.charAt(0).toUpperCase() + name.splice(1);
            }
            else {
                let temp = name.split(' ');
                temp = temp[temp.length-1].charAt(0).toUpperCase() + temp[temp.length-1].splice(1);
                return temp;
            }
        }

        let author = '';

        if (page == null) {
            if (this.page_start === 'undefined')
                page = '1';
            else
                page = this.page_start;
        }

        if (this.author.length === 1 && this.author[0] !== undefined) {
            author = set_lastName(this.author[0]);
        }
        else if (this.author.length > 1 && this.author.length < 3) {
            author = set_lastName(this.author[0]) + 'dan' + set_lastName(this.author[1]);
        }
        else if (this.author.length > 2) {
            author = set_lastName(this.author[0]) + '<em>et al</em>.';
        }

        if (arrange === 'front') {
            return author + ' ('+this.year+': '+page+') ';
        }
        else {
            return '('+author+', '+this.year+': '+page+')';
        }

    }

}
