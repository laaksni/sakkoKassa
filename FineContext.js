import React, { createContext, useState } from "react";

export const FineContext = createContext();

export const FineProvider = ({ children }) => {
  const [sakot, setSakot] = useState([]);
  const [sakkokassaSumma, setSakkokassaSumma] = useState(0);

  const lisaaSakko = (pelaaja, nimi, summa) => {
    const uusiSakko = {
      id: Math.random().toString(),
      pelaaja,
      nimi,
      summa: parseFloat(summa),
      maksettu: false,
    };
    setSakot((prev) => [...prev, uusiSakko]);
  };

  const merkitseMaksetuksi = (id) => {
    setSakot((prevSakot) =>
      prevSakot.map((sakko) => {
        if (sakko.id === id) {
          setSakkokassaSumma((prevSumma) =>
            sakko.maksettu
              ? prevSumma - sakko.summa
              : prevSumma + sakko.summa
          );

          return { ...sakko, maksettu: !sakko.maksettu };
        }
        return sakko;
      })
    );
  };

  return (
    <FineContext.Provider value={{ sakot, sakkokassaSumma, lisaaSakko, merkitseMaksetuksi }}>
      {children}
    </FineContext.Provider>
  );
};
