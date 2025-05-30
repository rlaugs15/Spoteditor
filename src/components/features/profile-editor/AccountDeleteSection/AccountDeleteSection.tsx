import AccountDeleteDialog from './AccountDeleteDialog';

export default function AccountDeleteSection() {
  return (
    <section className="mt-10">
      <p className="mb-4 font-bold text-text-md web:text-text-2xl">계정 설정</p>
      <div className="flex items-center justify-between py-[5px]">
        <p className="font-bold text-text-sm">계정 삭제</p>
        <AccountDeleteDialog />
      </div>
      <p className="font-medium text-light-300 text-text-xs">
        계정 삭제 시 모든 데이터는 영구적으로 삭제되며, 복구가 불가능합니다.
        <br />
        신중히 결정해주시기 바랍니다.
      </p>
    </section>
  );
}
