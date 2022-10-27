export function hasSubstring(text,sub){
    text = text.toLowerCase()
    sub = sub.toLowerCase()
    const sl = sub.length
    for(var i=0;i<text.length-sl+1;i++){
        if(text.slice(i,i+sl) == sub){
            return true
        }
    }
    return false
}