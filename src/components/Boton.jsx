import React, { forwardRef } from "react";

// renderiza el botón del juego con el color, borde y fondo recibido como props,
// el evento onClick, y ref para interactuar con el botón
const GameBtn = forwardRef(({ color, border, bg, onClick }, ref) => (
  <button
    color={color}
    className={`${border} ${bg} 
      w-[120px] h-[120px]           
      sm:w-[170px] sm:h-[170px] 
      md:w-[175px] md:h-[175px]
      lg:w-[200px] lg:h-[200px]
      m-1 duration-200 hover:scale-105`}
    onClick={onClick}
    ref={ref}
  />
));

export default GameBtn;