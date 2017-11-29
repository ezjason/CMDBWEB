import format from './format'

export default function (val,line,column){
    if(!val){
        return ''
    }
    let time=val;
    let digit=val.toString().length;
    const timeLength=13;
    if(digit>timeLength){
        time=+new Date(val)
    }else{
        time=val*Math.pow(10,timeLength-digit)
    }
    return time?(format('yyyy/MM/dd hh:mm:ss',parseInt(time))):''
}