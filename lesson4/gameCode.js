
var event, ok;

var answers = [];

do {
    ok = false;
    event = +prompt(works.a00 + works.a1 + works.a2 + '-1 - Выход из игры');
   
    if (event == -1) {
        break;
    }
    else {
        ok = isAnswer(works.a0, event);
        if (event == 1) {
            answers.push(works.a1)
        } else {
            answers.push(works.a2)
        }
      }
} while (!ok);
switch (event) {
    case 1: 
        do {
            ok = false;
            event = +prompt(works.b00 + works.b1 + works.b2 + '-1 - Выход из игры');
            if (event == -1) {
                break;
            }
            else {
                ok = isAnswer(works.b0, event);
                if (event == 1) {
                    answers.push(works.b1)
                } else {
                    answers.push(works.b2)
                }
            }
        } while (!ok);
switch (event) {
        case 1: 
        secondAction ();

                break;
            case 2: 
            secondAction ();

                break;
            case -1: 
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: 
        do {
            ok = false;
            event = +prompt(works.c00 + works.c1 + works.c2 + '-1 - Выход из игры');
            if (event == -1) {
                break;
            }
            else {
                ok = isAnswer(works.c0, event);
                if (event == 1) {
                    answers.push(works.c1)
                } else {
                    answers.push(works.c2)
                }
            }
        } while (!ok);
        switch (event) {
            case 1: 
            secondAction();
                
                break;
            case 2: 
            secondAction();
                break;
            case -1: 
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1: 
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');


function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    }
    else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
	return true;
    
}

function secondAction () {
    do {
        ok = false;
        event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
        if (event == -1) {
            break;
        }
        else {
            ok = isAnswer(works.d0, event);
            if (event == 1) {
                answers.push(works.d1)
            } else {
                answers.push(works.d2)
            }
        }
    } while (!ok);
}

var displayQuestion = +prompt("Какой вопрос понравился Вам больше всего?")
if (displayQuestion == 1) {
    alert(works.a00 + answers[0])
} else if (displayQuestion == 2 && answers[0] == works.a1) {
    alert(works.b00 + answers[1])
} else if (displayQuestion == 2 && answers[0] == works.a2) {
    alert(works.c00 + answers[1])
} else if (displayQuestion == 3 && (answers[1] == works.b1 || answers[1] == works.c1 || answers[1] == works.b2)) {
    alert(works.d00 + answers[2])
}



