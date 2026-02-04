// const Spinner = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
//       <div className="loader"></div>
//     </div>
//   );
// };

// export default Spinner;
const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-sm">
      <div className="loader">
        <div className="jimu-primary-loading"></div>
      </div>
    </div>
  );
};

export default Spinner;

