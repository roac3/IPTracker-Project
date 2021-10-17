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

        console.log(ip)

        fetch("http://ip-api.com/json/"+ ip)
        .then(country => country.json())
        .then(country => {

            country_ip = country;

            console.log(country_ip);
            console.log(country_ip.city);

            if (country_ip.status == "success"){

                search();

                city.innerHTML = country_ip.country+", "+country_ip.city;
                isp. innerHTML = country_ip.isp;
                ip_html.innerHTML = ip;
                time.innerHTML = country_ip.timezone;
    
                iniciarMapa(country_ip.lat, country_ip.lon);
            }else{

                novalid.classList.add('show');

            }

            
        });

        input_ip.value = "";
        
        


    });




});