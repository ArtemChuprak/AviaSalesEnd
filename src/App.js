import React, { useEffect, useState  } from 'react';
import Logo from "./assets/logo.svg"

// import checkboxon from "./assets/checkboxon.svg"
// import checkboxoff from "./assets/checkboxoff.svg"
import './App.css';



function App() {
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [stop, setStop] = useState(false);
  const [sortTickets, setSortTickets] = useState([]);

  useEffect(()=> {
    if(stop === true) {
      setSortTickets(tickets.slice(0,5))
    }
  },[stop,tickets])

  useEffect(()=> {
    fetch("https://aviasales-test-api.kata.academy/search")
    .then((res) => res.json())
    .then((res)=> setSearchId(res.searchId))
    .catch((e) => console.log(e))

  }, [])

  useEffect(()=> {

    if(searchId && stop === false){

      async function subscribe() {
        let response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
        if (response.status === 502 || response.status === 500) {
          await subscribe();
        } else if (response.status === 400) {
        } else if (response.status !== 200) {
          console.error(response.statusText);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await subscribe();
        } else {
          let ticketsPart = await response.json();
          setTickets([...tickets, ...ticketsPart.tickets])
        
          if(ticketsPart.stop){
            setStop(true)

          } 
        }
      }
      subscribe();
    
    }
  }, [searchId, tickets, stop]);



  return (
    <div className="App">

      <div className='app-wrapper'>

        <div className='header'>
         <img src={Logo} alt='logo'/>
        </div>

          <div className='main'>

            <div className='dummi'>
              <div className='sidebar'>
              <h3>Количество пересадок</h3>
              <form>
                <label>
                  <input className='input visually-hidden' type='checkbox' />
                  <span className='checker'></span>
                  Все
                </label>

                <label>
                  <input className='input visually-hidden' type='checkbox' />
                  <span className='checker'></span>
                  Без пересадок
                </label>

                <label>
                  <input className='input visually-hidden' type='checkbox' />
                  <span className='checker'></span>
                  1 пересадка
                </label>

                <label>
                  <input className='input visually-hidden' type='checkbox' />
                  <span className='checker'></span>
                  2 пересадки
                </label>

                <label>
                  <input className='input visually-hidden' type='checkbox' />
                  <span className='checker'></span>
                  3 пересадки
                </label>

              </form>
              </div>
            </div>

            <div className='filter2'>
              <div className='filter2_element filter2_low-price filter2_element_clicked '>Самый дешевый</div>
              <div className='filter2_element filter2_faster'>Самый быстрый</div>
              <div className='filter2_element filter2_faster'>Оптимальный</div>
            </div>

            <div className='tickets'>
             

              {sortTickets.map((ticket)=>(

              <div className='ticket' key={ticket.segments[0].date + ticket.segments[1].date}>
                <div className='ticket_header'>
                  <div className='ticket_price'>{ticket.price.toString().split('').reverse().reduce((agr, char, i)=> {
                    if(i % 3 === 0) {
                      return agr + " " + char
                    }
                    return agr + char
                  },"Р ").split('').reverse().join("")}</div>
                  <div className='ticket_logo'>
                    <img src= {`//pics.avs.io/99/36/${ticket.carrier}.png`} alt='logo airvays'/>
                  </div>
                </div>
                <div className='ticket_data-wrapper'>
                  {ticket.segments.map((segment) => (

                    <div className='ticket_data' key={segment.date}>
                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>{`${segment.origin} - ${segment.destination}`}</p>

                      <p>{new Date(segment.date).getHours() + 

                      ":" + new Date(segment.date).getMinutes() + 

                      " - " + new Date(new Date(segment.date).setHours(new Date(segment.date).getHours() + Math.ceil(segment.duration/60) )).getHours() +

                      ":" + new Date(new Date(segment.date).setMinutes(new Date(segment.date).getMinutes() + segment.duration)).getMinutes()}</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>В пути</p>
                      <p>{Math.ceil(segment.duration / 60) + "ч " + (segment.duration % 60) + "м"}</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>{segment.stops.length === 0 ? "Без пересадок": segment.stops.length === 1 ? " 1 Пересадка" : 2 <= segment.stops.length <= 4 ? `${segment.stops.length} пересадки` : '' }</p>
                      <p>{segment.stops.join(", ")}</p>
                    </div>

                    </div>
                  ))}
                 

                  
                </div>
              </div>
              ))}

              

              {/* <div className='ticket'>
                <div className='ticket_header'>
                  <div className='ticket_price'>13 400P</div>
                  <div className='ticket_logo'>
                    <img src={s7Logo} alt='logo airvays'/>
                  </div>
                </div>
                <div className='ticket_data-wrapper'>

                  <div className='ticket_data'>
                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                  </div>

                  <div className='ticket_data'>
                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div className='ticket'>
                <div className='ticket_header'>
                  <div className='ticket_price'>13 400P</div>
                  <div className='ticket_logo'>
                    <img src={s7Logo} alt='logo airvays'/>
                  </div>
                </div>
                <div className='ticket_data-wrapper'>

                  <div className='ticket_data'>
                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                  </div>

                  <div className='ticket_data'>
                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>

                    <div className='ticket_data_item'>
                      <p className='ticket_data_item_gray'>MOW – HKT</p>
                      <p>10:45 – 08:00</p>
                    </div>
                    
                  </div>
                </div>
              </div> */}
            </div>

          </div>
      </div>
     
    </div>
  );
}

export default App;
