function validaNome(tamanho: number){
    // target = cosntrutor da nossa classe
    // key = nossa propriedade
     return (target: any, key : string) => {
      let valor = target[key];
       const getter = () => valor;
       const setter = (value: string) => {
        if(value === ""){
          console.log("Você nao pode deixar em branco");
        }else if(value.length < tamanho){
                  console.log("Você nao pode criar com esse tamanho")
        }else{
          valor = value;
        }
      }
       Object.defineProperty(target, key, {
        get: getter,
        set: setter
       })
     }
  }
 