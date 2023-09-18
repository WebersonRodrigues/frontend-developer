import './index.css';

import InputText from '../../components/InputText';

function Home (){
    return (
        <div>
            <h1>
                Home em construção...
            </h1>
            <InputText
                id="1"
                type="text"
                placeholder="Exemplo01@gmail.com"
                text="Exemplo01"
                callback={(e) => console.log(e.target.value)}
            />

            <InputText
                id="2"
                type="password"
                placeholder="Exemplo02@gmail.com"
                text="Exemplo02"
                callback={(e) => console.log(e.target.value)}
            />

            <InputText
                id="6"
                type="checkbox"
                placeholder="Exemplo02@gmail.com"
                text="Exemplo02"
                callback={(e) => console.log(e.target.value)}
            />

        </div>
    )
}

export default Home;