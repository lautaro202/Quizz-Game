import './App.css';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography'
import {useState} from 'react'
import Card from '@material-ui/core/Card'

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
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(false)
  const Preguntas = trivia.questions[question].text
  const Trivia = trivia.questions[question].options[question]
  const Image = trivia.questions[question].image
  const Answers = trivia.questions[question].options
  const strings = JSON.stringify(Preguntas).replace(/['"]+/g, '')
  const handleNext = (isCorrect) => {

    if(isCorrect === true) {
      setScore(score + 1)
    }

    console.log(score)
    const nextQuestion = question + 1
    if (nextQuestion < trivia.questions.length) {
      setQuestion(nextQuestion)

    }
    else {
      alert('no hay mas preguntas')
    }
  }


  return (
    <div className="App">
      <div className='App-header'>
      <Container >
        {score == 2 ? <div>ganaste</div> : null}
        {score <= 2 && question == 1 ? <div>perdiste</div> : null}

        {!start ? <Typography className={classes.title}>
         {trivia.title}
        </Typography> : null}

        {start ? 
          <Typography>{strings}:
          <p>
            <img className={classes.image} src={Image}/>
          </p>
          <p>{Answers.map((options) => {
            return (
              <div>
                <Button className={classes.button} onClick={() => handleNext(options.correct)}>
                {options.text}
              </Button>

              </div>
            )
          })}</p>
              <Button onClick={handleNext} >
                Siguiente
              </Button>
          </Typography>
        : null}
        {/* <img src={trivia.image}/> */}
        {!start ? <Button onClick={handleClick} >
          Comenzar
        </Button> : null}

      </Container>
        
      </div>

    </div>
  );
}

export default App;
