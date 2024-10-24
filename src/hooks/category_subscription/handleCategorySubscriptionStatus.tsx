import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export const getCategorySubscriptionPopup = async (
  categoryId: number | string,
  newStatus: 'approved' | 'rejected',
  adminName: string,
  DateNow: string,
) => {
  let title = newStatus === 'approved' ? 'تأكيد الموافقة' : 'تفاصيل الطلب';
  let confirmButtonText =
    newStatus === 'approved' ? 'تأكيد الموافقة' : 'تأكيد الرفض';
  let reasonTextarea =
    newStatus === 'rejected'
      ? `<div class="w-90">
           <textarea id="reason" class="swal2-textarea w-full text-right" placeholder="اكتب سبب الرفض هنا" rows="4"></textarea>
         </div>`
      : '';

  return Swal.fire({
    html: `
      <div class="text-center bg-secondaryBG-light dark:bg-secondaryBG-dark">
        <h3 class="text-xl font-semibold text-text-light dark:text-text-dark mb-2">${title}</h3>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
            <span class="block font-bold text-lg">رقم القسم</span>
            <span class="">RS-${categoryId}</span>
          </div>
          <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
            <span class="block font-bold text-lg">تاريخ اليوم</span>
            <span class="">${DateNow}</span>
          </div>
          <div class="text-text-light dark:text-text-dark bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-1 rounded-md">
            <span class="block font-bold text-lg">بواسطة</span>
            <span class="">${adminName}</span>
          </div>
        </div>
        ${reasonTextarea} <!-- Only visible if rejected -->
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    customClass: {
      popup:
        'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark rounded-md',
      confirmButton:
        newStatus === 'approved'
          ? 'custom-confirm-btn bg-ConfirmIconBg text-white font-bold py-2 px-4 rounded'
          : 'custom-confirm-btn bg-RejectIconBg text-white font-bold py-2 px-4 rounded',
      cancelButton:
        'custom-cancel-btn bg-red-500 text-white font-bold py-2 px-4 rounded',
    },
    confirmButtonText: confirmButtonText,
    cancelButtonText: 'إلغاء',
    preConfirm: () => {
      if (newStatus === 'rejected') {
        const reason = document.getElementById('reason')?.value;
        if (!reason) {
          Swal.showValidationMessage('الرجاء كتابة سبب الرفض');
        }
        return reason;
      }
      return ''; // No reason required for approval
    },
  });
};
