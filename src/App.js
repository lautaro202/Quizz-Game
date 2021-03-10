import './App.css';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography'
import {useState} from 'react'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize:'large'
  },
  image: {
    height:100,
    width:100,
    justifyContent: 'center',
  },
  button:{
    color:'inherit',
  }
}));
const trivia = {
  title: "Trivia de prueba",
  image: "https://48tools.com/wp-content/uploads/2015/09/shortlink.png",
  questions: [
    {
      text: "Pregunta 1",
      image: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      lifetimeSeconds: 10,
      options: [
        { text: "Opcion1", correct: true },
        { text: "Opcion2", correct: false },
        { text: "Opcion3", correct: true }
      ]
    },
    {
      text: "Pregunta 2",
      image: "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg",
      lifetimeSeconds: 5,
      options: [
        { text: "Opcion1", correct: true },
        { text: "Opcion2", correct: false },
        { text: "Opcion3", correct: false }
      ]
    }
  ]
};

function App() {  
  const [start, setStart] = useState(false)
  const handleClick = () => {
    setStart(true)
  }
  const classes = useStyles()
  const [question, setQuestion] = useState(0)
  const [defeat, setDefeat] = useState(true)
  const Preguntas = trivia.questions[question].text
  const Image = trivia.questions[question].image
  const Answers = trivia.questions[question].options
  const strings = JSON.stringify(Preguntas).replace(/['"]+/g, '')
  const [score, setScore] = useState(0)


  const HandleNext = (isCorrect) => {
    if(isCorrect === true) {
      setScore(score + 1)
    }
    const nextQuestion = question + 1
    if (nextQuestion < trivia.questions.length) {
      setQuestion(nextQuestion)
      
    }
 
    else if (score < 1 ) {
      setDefeat(true)

    }  
    
    else if (score === 2 ) {
      setDefeat(false)
    } 
    else {
      alert('no hay mas preguntas')
    }
  }




  return (
    <div className="App">
      <div className='App-header'>
      <Container >
        <AppBar>
          Se gana contestando bien 1 de 2 preguntas
        </AppBar>
        <Typography>
          <div>respondiste bien {score} de 2 preguntas </div> 
          <img style={{maxHeight:100, maxWidth:100}}src={trivia.image}/>

        </Typography>
        {!start ? <Typography className={classes.title}>
         {trivia.title}
        </Typography> : null}
        {start && score < 2  ?
          <Typography>{strings}:
          <p>
            <img className={classes.image} src={Image}/>
          </p>
          <p>{Answers.map((options) => {
            return (
              <div>
                <Button className={classes.button} onClick={() => HandleNext(options.correct)}>
                {options.text}
              </Button>

              </div>
            )
          })}</p>
              <Button onClick={HandleNext} >
                Siguiente
              </Button>
          </Typography>
          
        :  question <= 1 ? console.log('anda por fabor') :  console.log('anda por fabor') } 
        {console.log(question)}
        {score === 2 ?  <div>Felicidades ganaste!</div> : null}
        {!start ? <Button onClick={handleClick} >
          Comenzar
        </Button> : null}

      </Container>
        
      </div>

    </div>
  );
}

export default App;
