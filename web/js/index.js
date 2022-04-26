/*
 @Brian dev
 *****Registration window*****
 */

document.querySelectorAll('#fake').forEach( (f, k) => {
    const exception = ["Age","Campus","Gender"];
    if(!exception.includes(f.attributes[0].value)){
        if(f.value){
            document.getElementById(f.attributes[1].value).value = f.value
            document.querySelectorAll('.legend')[k].style.display = "block";
        }
    }
})
document.querySelectorAll('#login_fake').forEach( (f, k) => {
    if(f.value){
        document.getElementById(f.attributes[1].value).value = f.value
        document.querySelectorAll('.legend')[k].style.display = "block";
    }
})
$(document).on('click','#prev_data', function(e){
    e.preventDefault();
    const cloneBox = [...document.querySelectorAll('#fake')]
    const isEmpty = cloneBox.map( (i, k) => {
        return { 'val' : i.value, 'input' : i.attributes[0].value };
    })
    isEmpty.filter( i => {
        if(i.input == "Middle Name")
            if(i.val == "")
                i.val = true;
    })
    const inputEmpty = isEmpty.map( i => i.val )
    if(inputEmpty.includes('')){
        inputEmpty.map( (i,k) => {
            if(i == "")
                document.querySelectorAll('#feedback')[k].innerHTML = isEmpty[k].input + ' Cannot Be empty';
        })
    }else{
        let allow = true; //Validation
        isEmpty.map( (i, k) => {
            if(i.input == "Student ID"){
                let pattern = /[A-Z]/g;
                let result = i.val.match(pattern);
                if(!result){
                    document.querySelectorAll('#feedback')[k].innerHTML = i.input + ' format should be in UpperCase';
                    allow = false;
                }
                let input_val = i.val.split('/')
                if(input_val.length !== 3){
                    allow = false;
                    document.querySelectorAll('#feedback')[k].innerHTML = i.input + ' format is ABC/123A/2022';
                }
            }
            if(i.input == "Student Email"){
                let pattern = /[@]/g;
                let result = i.val.match(pattern);

                if(!result){
                    document.querySelectorAll('#feedback')[k].innerHTML = i.input + ' format should contain @';
                    allow = false;
                }
                let input_val = i.val.split('@')
                if(input_val.length == 2){
                    if(input_val[1] !== "students.tum.ac.ke"){
                        document.querySelectorAll('#feedback')[k].innerHTML = i.input + ' format should contain @students.tum.ac.ke';
                        allow = false;
                    }
                }
                let student_id = document.querySelectorAll('#fake')[3].value.split('/')
                student_id.map( p => {
                    let pattern = /[p.toLowerCase]/g;
                    let result = i.val.match(pattern);
                    if(!result){
                        document.querySelectorAll('#feedback')[k].innerHTML += i.input + ' format should contain ' + p.toLowerCase;
                        allow = false;
                    }
                })
            }
            if(i.input == "Personal Email"){
                let pattern_at = /[@]/g;
                let result_at = i.val.match(pattern_at);
                if(!result_at){
                    document.querySelectorAll('#feedback')[k].innerHTML = i.input + ' format should contain @ ie example@gmail.com';
                    allow = false;
                }
                let pattern_com = /[com]/g;
                let result_com = i.val.match(pattern_com);
                if(!result_com){
                    document.querySelectorAll('#feedback')[k].innerHTML = i.input + ' format should contain com ie example@gmail.com';
                    allow = false;
                }
            }
            if(i.input == "Mobile Number"){
                var input = document.querySelector(".mobile_flag");
                var dialCode = document.querySelector(".iti__selected-dial-code").innerHTML

                let mCode = $('.mobile_flag').val()
                const telephone = dialCode + '' + mCode
                input.value = telephone

                var iti = intlTelInput(input)
                const valid = iti.isValidNumber()

                if(!valid){
                    allow = false;
                    document.querySelectorAll('#feedback')[k].innerHTML = i.input + ' invalid format';
                }else
                    document.getElementById(document.querySelectorAll('#fake')[k].attributes[1].value).value = telephone

            }
        })
        if(allow){

            const p = document.createElement('div');
            p.setAttribute('class','main-prev')
            const pu = document.createElement('div');
            pu.setAttribute('class','data-prev')
            const po = document.createElement('div');
            po.setAttribute('id','wrap-contain')
            p.appendChild(pu)
            pu.appendChild(po)
            document.querySelectorAll('#fake').forEach( (i, k) => {
                po.innerHTML += `<section>
                                    <h4>${ i.attributes[0].value }</h4>
                                    <span>${ i.value }</span>
                                </section>`
            })
            pu.innerHTML += "<button id = 'confirm-data'>OK</button>"
            document.getElementById('build').appendChild(p)
        }
    }
})
$(document).on('click','#fake', function(e){

    const clone_fakes = [...document.querySelectorAll('#fake')]
    const clone_fake_input = clone_fakes.map( i => i.attributes[0].value )
    const clone_loop = getKey(clone_fake_input,e.currentTarget.attributes[0].value)

    document.querySelectorAll('#feedback')[clone_loop].innerHTML = ''
    if(e.currentTarget.value)
        $(e.currentTarget.attributes[2].value).slideDown();
    else
        $(e.currentTarget.attributes[2].value).slideUp();
})
$(document).on('keyup','#fake', function(e){

    if(e.currentTarget.value)
        $(e.currentTarget.attributes[2].value).slideDown();
    else
        $(e.currentTarget.attributes[2].value).slideUp();
})
$(document).on('click','#login_fake', function(e){
    const clone_fakes = [...document.querySelectorAll('#login_fake')]
    const clone_fake_input = clone_fakes.map( i => i.attributes[0].value )
    const clone_loop = getKey(clone_fake_input,e.currentTarget.attributes[0].value)

    document.querySelectorAll('#feedback')[clone_loop].innerHTML = ''
    if(e.currentTarget.value)
        $(e.currentTarget.attributes[2].value).slideDown();
    else
        $(e.currentTarget.attributes[2].value).slideUp();
})
$(document).on('keyup','#login_fake', function(e){
    if(e.currentTarget.value)
        $(e.currentTarget.attributes[2].value).slideDown();
    else
        $(e.currentTarget.attributes[2].value).slideUp();
    document.getElementById(e.currentTarget.attributes[1].value).value = e.currentTarget.value.trim()
})
function getKey(object,value){ //Get Array keys
    return Object.keys(object).find(key => object[key] == value);
}
$(document).on('click','#confirm-data', (e) => {
    $('.main-prev').remove();
    $('.button-send').css('display','block');
    //Final values
    document.querySelectorAll('#fake').forEach( i => {
        const fake_input = i.attributes[1].value
        if(fake_input == "Registration_name"){
            const loop = i.attributes[3].value
            if(loop == 0)
               document.getElementById(fake_input).value = i.value.trim().toUpperCase()
            else
                document.getElementById(fake_input).value += "," + i.value.trim().toUpperCase()
        }else
            if(fake_input !== "Registration_mobile")
                document.getElementById(fake_input).value = i.value.trim()

    })
})
const getTelephone = (input) => {
    if(input){
       (function(window, input){
            window.intlTelInput(input, {
                autoHideDialCode: true,
                dropdownContainer: document.body,
                //formatOnDisplay: true,
                geoIpLookup:function(callback) {
                    callback('KE')
                },
                hiddenInput: "true",
                initialCountry: "auto",
                nationalMode: true,
                separateDialCode: true,
                utilsScript: "js/utils.js",
            });
       }(window, input))
    }
}
var input = document.querySelector(".mobile_flag");
getTelephone(input)

/*
 *** otp window ***
 *
 */
 const finalInput = []
$(document).on('keyup','.otp', (e) => {
    const s = document.querySelectorAll('.otp');
    if(e.currentTarget.value.length > 0){
        s.forEach((v,k,self) => {
            if(e.currentTarget.id == v.id){
                const n = Number(k) + 1;
                finalInput[k] = e.currentTarget.value
                e.currentTarget.setAttribute('readonly',true)
                if(n < 4)
                    document.getElementById(self[n].id).focus();
            }
        });
    }else{
        s.forEach((v,k,self) => {
            if(e.currentTarget.id == v.id){
                const n = Number(k) - 1;
                finalInput[k] = e.currentTarget.value
                if(n > -1){
                    document.getElementById(self[n].id).focus();
                    document.getElementById(self[n].id).removeAttribute('readonly')
                }else
                    e.preventDefault();
            }
        });
    }
    document.getElementById('otp_id').value = finalInput.join('')
});
