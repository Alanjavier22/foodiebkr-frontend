import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMethod } from "../../../fetch/getMethod";
import { motion } from "framer-motion";

const CursosTd = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getMethod({
      path: `/cursos/true`,
      setData: (res) => {
        setData(res || []);
      },
      setIsLoading: (loading) => {
        // getMethod calls it with false in finally()
        if (!loading) {
          setIsLoaded(true);
        }
      },
      showSwal: false,
    });
  }, []);

  const goToDetails = (item) => {
    navigate(`/cursos/${item.id_cursos}/${item.nombre}`);
  };

  return (
    <div className="min-h-screen bg-[#f9fbfc] pt-12 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/60 to-pink-100/50 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 w-full">
        {/* Header Options */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 w-full"
        >
          <div className="inline-block p-4 rounded-full bg-orange-50 text-orange-600 mb-4 shadow-sm border border-orange-100/50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-800 tracking-tight uppercase">
            Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">Cursos</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-4 max-w-2xl mx-auto">Aprende de los mejores maestros reposteros y domina el arte de la panadería moderna con nuestras especialidades.</p>
        </motion.div>

        {!isLoaded ? (
           <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>
        ) : data.length === 0 ? (
          // --- EMPTY STATE ---
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 bg-white/60 backdrop-blur-xl border border-white max-w-3xl mx-auto rounded-[3rem] shadow-xl text-center"
          >
             <div className="w-40 h-40 mb-8 opacity-80">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png" alt="No courses" className="w-full h-full object-contain grayscale opacity-60" />
             </div>
             <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Aún no hay cursos agendados</h2>
             <p className="text-gray-500 font-medium text-lg max-w-md">Actualmente nuestros maestros están preparando el próximo calendario. ¡Vuelve pronto para no perderte nuestras nuevas clases!</p>
             <button 
                onClick={() => window.history.back()}
                className="mt-8 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold uppercase tracking-wider transition-all shadow-xl hover:-translate-y-1"
             >
                Volver a la Tienda
             </button>
          </motion.div>
        ) : (
          // --- COURSES GRID ---
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {data.map((item, index) => (
              <motion.div
                key={item.id_cursos}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/80 shadow-lg rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row h-full"
              >
                {/* Course Image */}
                <div className="w-full sm:w-2/5 h-64 sm:h-auto relative overflow-hidden bg-gray-100 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10 sm:hidden"></div>
                  <img 
                    src={item.foto || "./logo.png"} 
                    alt={item.nombre} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Badges Floating on Image for Mobile */}
                  <div className="absolute bottom-4 left-4 z-20 flex gap-2 sm:hidden">
                    <span className="bg-orange-500/90 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full backdrop-blur-md">
                      {item.modalidad}
                    </span>
                    <span className="bg-black/60 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-full backdrop-blur-md">
                      {item.duracion_horas}h
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col justify-between h-full bg-white/40">
                   <div>
                      {/* Badges for Desktop */}
                      <div className="hidden sm:flex flex-wrap gap-2 mb-4">
                        <span className="bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-wider py-1.5 px-3 rounded-full">
                          {item.modalidad}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-xs font-black uppercase tracking-wider py-1.5 px-3 rounded-full">
                          <i className="far fa-clock mr-1"></i> {item.duracion_horas} horas
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight mb-3 line-clamp-2">
                        {item.nombre}
                      </h3>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-3">
                        {item.primeraLineaDescripcion}
                      </p>
                   </div>

                   <button
                     onClick={() => goToDetails(item)}
                     className="mt-8 w-full py-3.5 bg-gray-900 group-hover:bg-orange-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-colors duration-300 shadow-md"
                   >
                     Información Completa
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CursosTd;
