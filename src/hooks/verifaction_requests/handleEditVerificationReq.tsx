import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const handleEditVerificationRequest = (
  ID: number | string,
  verification_type: string,
  verification_type_number: number | string,
  byAdmin: string = '',
  SrcImage: string,
  TransImage: string,
) => {
  Swal.fire({
    html: `
    <div class="text-center">
      <h3 class="text-xl font-semibold text-text-light dark:text-text-dark mb-2">تحرير تذكرة القسم</h3>
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-primaryBG-light dark:bg-primaryBG-dark text-text-light dark:text-text-dark border border-Input-border p-2 rounded-lg">
          <span class="block text-lg">بواسطة</span>
          <span class="text-lg font-bold">${byAdmin}</span>
        </div>
        <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark p-2 border border-Input-border rounded-lg">
          <span class="block text-lg">الجهة</span>
          <span class="text-lg font-bold">${verification_type}</span>
        </div>
        <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark p-2 border border-Input-border rounded-lg">
          <span class="block text-lg">رقم الجهة</span>
          <span class="text-lg font-bold">${verification_type_number}</span>
        </div>
        <div class="bg-primaryBG-light dark:bg-primaryBG-dark text-text-light dark:text-text-dark border border-Input-border p-2 rounded-lg">
          <span class="block text-lg">رقم التذكرة</span>
          <span class="text-lg font-bold">RS-${ID}</span>
        </div>
      </div>
      <div class="mt-4 flex justify-center p-2">
        <div class=" flex gap-4  bg-primaryBG-light dark:bg-primaryBG-dark rounded-lg">
          <div class="border border-Input-border rounded-lg">
                    <span class="block text-lg text-text-light dark:text-text-dark mb-2">صورة الجهة</span>

               <img src="${SrcImage}" alt="Transaction" class="w-32 h-30 object-cover mx-auto my-2 rounded-md" />
                     </div>
               <div class="border border-Input-border rounded-lg">
                                 <span class="block text-lg text-text-light dark:text-text-dark mb-2">صورة التحويل</span>

          <img src="${TransImage}" alt="Transaction" class="w-32 h-30 object-cover mx-auto my-2 rounded-md" />
               </div>
       
    
     
        </div>
      </div>
    </div>
  `,
    showConfirmButton: false,
    customClass: {
      popup:
        'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark border rounded-lg p-2',
    },
  });
};

export default handleEditVerificationRequest;
