export function returnDayOfWeek(day: number){
    if(day < 0 || day > 6) throw new Error('day must be between 0 and 6');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + day);
    return nextDate
}

export function toggleClassForId(id: string, addClass: string | null, removeClass: string| null){
    const element = document.getElementById(id);
    if(element){
        if(addClass){
            console.log('adding class for', id,  addClass)
            element.classList.add(addClass);
        }

        if(removeClass){
            console.log('removing class', id, removeClass)
            element.classList.remove(removeClass);
        }
    }
}

export function toggleClassForAllElementsByClass(className: string, addClass: string | null, removeClass: string | null){
    const elements = document.getElementsByClassName(className);
    for(const element of elements){
        if(addClass){
            element.classList.add(addClass);
        }

        if(removeClass){
            element.classList.remove(removeClass);
        }
    }
}

export function toggleClassForFirstClass(className: string, addClass: string | null, removeClass: string | null){
    const element = document.getElementsByClassName(className)[0];
    if(element){
        if(addClass){
            element.classList.add(addClass);
        }

        if(removeClass){
            element.classList.remove(removeClass);
        }
    }
}

export function toggleClassForElement(element : HTMLElement, addClass: string | null, removeClass: string | null){
    if(addClass){
        element.classList.add(addClass);
    }

    if(removeClass){
        element.classList.remove(removeClass);
    }
}