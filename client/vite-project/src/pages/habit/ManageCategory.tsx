import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  IoChevronBack,
  IoAddOutline,
  IoEllipsisHorizontal,
} from 'react-icons/io5';
import {
  getManagedCategories,
  createUserCategory,
  updateUserCategory,
  deleteUserCategory,
  type CategoryManageResponse,
} from '../../api/category';
import { COLORS } from '../../constants/colors';
import { showToast } from '../../components/ui/toast/Toast';
import CategoryAddModal from '../../components/shared/habit/CategoryAddModal';

const today = new Date().toISOString().split('T')[0];

const ManageCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CategoryManageResponse | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CategoryManageResponse | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ['managedCategories'],
    queryFn: getManagedCategories,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['managedCategories'] });
    queryClient.invalidateQueries({ queryKey: ['userCategories'] });
  };

  const createMutation = useMutation({
    mutationFn: ({ name, emoji }: { name: string; emoji: string | null }) =>
      createUserCategory(name, emoji),
    onSuccess: () => {
      showToast.success('카테고리가 추가됐어요');
      invalidate();
    },
    onError: () => showToast.error('카테고리 추가에 실패했어요'),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      name,
      emoji,
    }: {
      id: number;
      name: string;
      emoji: string | null;
    }) => updateUserCategory(id, name, emoji),
    onSuccess: () => {
      showToast.success('카테고리가 수정됐어요');
      invalidate();
    },
    onError: () => showToast.error('카테고리 수정에 실패했어요'),
  });

  const deleteMutation = useMutation({
    mutationFn: (categoryUserId: number) => deleteUserCategory(categoryUserId),
    onSuccess: () => {
      showToast.success('카테고리가 삭제됐어요');
      invalidate();
    },
    onError: () => showToast.error('카테고리 삭제에 실패했어요'),
  });

  return (
    <div className="min-h-screen bg-white">
      {/* 팝오버 열려있을 때 바깥 클릭으로 닫기 */}
      {openMenuId !== null && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenMenuId(null)}
        />
      )}

      <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
        <div className="pt-[env(safe-area-inset-top)]" />
        <div className="relative flex h-14 items-center justify-center px-4">
          <button onClick={() => navigate(-1)} className="absolute left-2 p-2">
            <IoChevronBack className="text-2xl text-zinc-900" />
          </button>
          <h1 className="text-[16px] font-semibold text-zinc-950">
            카테고리 관리
          </h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="absolute right-2 p-2"
          >
            <IoAddOutline className="text-2xl text-zinc-900" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-3">
        {categories.map((cat) => {
          const count = cat.habitCount;
          const isOpen = openMenuId === cat.categoryUserId;

          return (
            <div key={cat.categoryId} className="relative">
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-full border border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 flex items-center justify-center rounded-full">
                    {cat.emoji ?? '🏷️'}
                  </span>
                  <span className="text-sm text-zinc-600">
                    {cat.name}
                  </span>
                  <span
                    className={`text-sm ${count > 0 ? 'text-blue-600' : 'text-zinc-400'}`}
                  >
                    {count}
                  </span>
                </div>
                <button
                  onClick={() => setOpenMenuId(isOpen ? null : cat.categoryUserId)}
                  className="p-2"
                >
                  <IoEllipsisHorizontal className="text-zinc-400 text-xl" />
                </button>
              </div>

              {/* 인라인 팝오버 */}
              {isOpen && (
                <div className="p-2 absolute right-0 top-full mt-1 z-30 w-30 rounded-2xl bg-white border border-zinc-100 shadow-lg overflow-hidden">
                  {[
                    {
                      label: '수정하기',
                      onClick: () => {
                        setEditTarget(cat);
                        setOpenMenuId(null);
                      },
                    },
                    {
                      label: '삭제하기',
                      onClick: () => {
                        setDeleteTarget(cat);
                        setOpenMenuId(null);
                      },
                    },
                  ].map(({ label, onClick }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={onClick}
                      className=" w-26 px-4 py-3 text-sm text-zinc-800 rounded-xl transition-colors"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.primary;
                        e.currentTarget.style.backgroundColor =
                          COLORS.primary_bg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.backgroundColor = '';
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 카테고리 추가 모달 */}
      <CategoryAddModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={(name, emoji) => createMutation.mutate({ name, emoji })}
      />

      {/* 삭제 확인 모달 */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setDeleteTarget(null)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative mx-6 w-full max-w-[320px] rounded-4xl bg-white px-5 py-8 text-center">
            <p className="text-[18px] font-semibold text-zinc-800">
              이 카테고리를 삭제하시겠어요?
            </p>
            <p className="text-[16px] font-semibold mt-1 text-zinc-500">
              삭제한 카테고리는 복구할 수 없어요.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-full border border-zinc-300 py-2.5 text-[15px] font-medium text-zinc-700"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteMutation.mutate(deleteTarget.categoryUserId);
                  setDeleteTarget(null);
                }}
                className="flex-1 rounded-full bg-[#FFD6D6] py-2.5 text-[15px] font-medium text-[#A80606]"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 카테고리 수정 모달 */}
      {editTarget && (
        <CategoryAddModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          mode="edit"
          initialName={editTarget.name}
          initialEmoji={editTarget.emoji}
          title="카테고리 수정"
          onSubmit={(name, emoji) => {
            updateMutation.mutate({ id: editTarget.categoryUserId, name, emoji });
            setEditTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageCategory;
