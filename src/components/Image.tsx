// import React from 'react';
// import { useState } from 'react';
//
// const ImageComponent: React.FC = ({ file }) => {
//   const [imageUrl, setImageUrl] = useState('');
//
//     const reader = new FileReader();
//     if (file) {
//       reader.onloadend = () => {
//         if (typeof reader.result === 'string') {
//           setImageUrl(reader.result)
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//
//
//   return (
//     <div>
//       {imageUrl && <img src={imageUrl} alt="uploaded" />}
//     </div>
//   );
// };
//
// export default ImageComponent;