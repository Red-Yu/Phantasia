// 這是用來寫離很遠的組件可以直接互相傳遞的
import mitt from "mitt";

export const eventBus = mitt();