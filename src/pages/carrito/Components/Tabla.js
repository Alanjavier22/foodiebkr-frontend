import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { CartContext } from "../../../context/CartContext";

import { Form } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";

import CodigoDescuento from "./CodigoDescuento";

const Tabla = ({ data, user }) => {
  const [rows, setRows] = useState(data);

  const { setDataCar } = useContext(CartContext);
  const navigate = useNavigate();

  const updateLocalStorage = (updatedRows) => {
    let { descuento } = JSON.parse(localStorage.getItem("descuento")) || {
      descuento: 0,
    };

    setRows(updatedRows);
    setDataCar(updatedRows, descuento);

    if (updatedRows.length !== 0) {
      localStorage.setItem("Carrito", JSON.stringify(updatedRows));

      swal({
        text: "Carrito actualizado",
        icon: "success",
        timer: 1600,
        buttons: false,
        className: "left-modal",
      });
    } else {
      localStorage.removeItem("Carrito");
      navigate(`/carrito`);
    }
  };

  const deleteItem = (item) => {
    const updatedRows = rows.filter((row) => row.id !== item.id);
    updateLocalStorage(updatedRows);
  };

  const recalcute = () => {
    const updatedRows = rows.map((row) => {
      return {
        ...row,
        subtotal: Number(row.cantidad) * parseFloat(row.valor),
        total: Number(row.cantidad) * parseFloat(row.valor),
      };
    });
    updateLocalStorage(updatedRows);
  };

  //FUNCION PARA TOMAR VALORES SELECCIONADOS
  const handleChange = ({ value }, item) => {
    if (value.match(/^\d*$/) && value.length <= 3) {
      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) => {
          if (row.id === item.id) {
            return { ...row, cantidad: value };
          }
          return row;
        });
        return updatedRows;
      });
    }
  };

  const handleBlur = ({ value }, item) => {
    if (value === "") {
      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) => {
          if (row.id === item.id) {
            return { ...row, cantidad: row.subtotal / row.valor };
          }
          return row;
        });
        return updatedRows;
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-4">
      {/* Items List */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl rounded-3xl overflow-hidden relative">
        
        {/* Header (hidden on mobile, visible on md+) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/70 border-b border-gray-100/50 text-xs font-bold text-gray-500 uppercase tracking-widest relative z-10">
           <div className="col-span-1 text-center"></div>
           <div className="col-span-5">Producto</div>
           <div className="col-span-2 text-center">Precio (Sin IVA)</div>
           <div className="col-span-2 text-center">Cantidad</div>
           <div className="col-span-2 text-right">Subtotal</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100/50 max-h-[50vh] overflow-y-auto relative z-10 custom-scrollbar">
          {rows && rows.map((item, index) => (
             <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 items-center hover:bg-white/40 transition-colors">
               <div className="col-span-1 flex justify-center text-red-400 hover:text-red-500 transition-colors">
                 <button onClick={() => deleteItem(item)} className="p-2 bg-red-50 hover:bg-red-100 hover:scale-105 transition-all rounded-full shadow-sm">
                   <TiDelete size={26} />
                 </button>
               </div>
               
               <div className="col-span-1 md:col-span-5 flex items-center gap-6">
                 <img src={item?.imagen || "./logo.png"} alt={item?.nombre} className="w-24 h-24 object-cover rounded-2xl shadow-md border border-white" />
                 <span className="font-extrabold text-gray-700 capitalize text-lg">{item?.nombre}</span>
               </div>
               
               <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center font-bold text-gray-600 bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-xl">
                 <span className="md:hidden text-[10px] text-gray-400 uppercase tracking-widest">Precio: </span>
                 <span className="text-lg">${item?.valor}</span>
               </div>

               <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-xl">
                 <span className="md:hidden text-[10px] text-gray-400 uppercase tracking-widest">Cantidad: </span>
                 <Form.Control
                   className="w-20 text-center rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-400 shadow-inner font-bold text-lg"
                   name="cantidad" value={item.cantidad} maxLength={3}
                   onChange={({ target }) => handleChange(target, item)}
                   onBlur={({ target }) => handleBlur(target, item)}
                 />
               </div>

               <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center font-extrabold text-blue-600 text-xl bg-blue-50/50 md:bg-transparent p-3 md:p-0 rounded-xl">
                 <span className="md:hidden text-[10px] text-gray-400 uppercase tracking-widest">Subtotal: </span>
                 ${item?.total}
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Cart Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="w-full md:w-1/2">
           {user.login && <CodigoDescuento updatedRows={rows} />}
        </div>
        <button 
          className="w-full md:w-auto px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-full font-bold uppercase tracking-widest shadow-sm transition-all hover:shadow-md active:scale-95"
          onClick={recalcute}
        >
          Actualizar Carrito
        </button>
      </div>
    </div>
  );
};

export default Tabla;
