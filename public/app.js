addEventListener('load', ()=>{


    const btn_search = document.querySelector('.btn_search');

    const input_ip = document.querySelector('.input_ip');

    const novalid = document.querySelector('.novalid');

    const ip_html = document.querySelector('.ip');

    const city = document.querySelector('.city');

    const time = document.querySelector('.time-zone');

    const isp = document.querySelector('.isp');

    var country_ip = "";

    function iniciarMapa(lat,lng) {
        var coord = {lat, lng};
        var map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: coord
        });

        var marker = new google.maps.Marker({
            position: coord,
            map: map
        });
      }

      function search(){
          var valid_search = document.getElementsByClassName('show')[0];

          if(valid_search != undefined ){
              novalid.classList.remove('show');
          }
      }

      iniciarMapa(40.67319869995117,-73.94600677490234);

    btn_search.addEventListener('click', () =>{

        var ip = input_ip.value;


        fetch("https://ipapi.co/"+ ip +"/json/")
        .then(country => country.json())
        .then(country => {

            country_ip = country;

            if (country_ip.error != true){

                search();

                city.innerHTML = country_ip.country_name+", "+country_ip.city;
                isp. innerHTML = country_ip.org;
                ip_html.innerHTML = ip;
                time.innerHTML = country_ip.timezone;
    
                iniciarMapa(country_ip.latitude, country_ip.longitude);
                
            }else{

                novalid.classList.add('show');

            }

            
        });

        input_ip.value = "";
        
        


    });




});