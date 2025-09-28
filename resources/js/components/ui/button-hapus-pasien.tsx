import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { router } from "@inertiajs/react";

export default function HapusPasienButton({ pasien }: { pasien: any }) {
  const [open, setOpen] = useState(false);

  const handleHapus = () => {
    router.delete(`/data-pasien/${pasien.id}`, {
      preserveScroll: true,
    });
    setOpen(false); // tutup modal setelah hapus
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* tombol icon Trash sebagai trigger */}
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash size={16} />
        </Button>
      </DialogTrigger>

      {/* modal content */}
      <DialogContent className="w-[350px] rounded-lg  sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Yakin ingin menghapus pasien ?
            <p className="font-semibold text-lg text-center my-7">{pasien.nama_lengkap}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mx-auto gap-2">
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                >
                    Batal
                </Button>
                <Button
                    variant="destructive"
                    onClick={handleHapus}
                >
                    Hapus
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
