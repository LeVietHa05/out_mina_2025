import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center border-2 border-white backrops">
      <div className="flex flex-row w-7xl h-[640px] bg-white items-center justify-center mx-auto">
        <div className="flex w-1/2 flex-col ">
          <div className=" h-[40px] mt-8">
            <Image src={"/logo.png"} alt="logo" width={120} height={37}></Image>
          </div>
          <div className="flex-auto h-[600px] flex flex-col items-center justify-center">
            <div className="font-medium text-2xl">Đăng nhập</div>
            <div className="flex flex-row items-center justify-center py-3 px-4 my-8 w-112 border border-2 border-[#3B82F6] rounded-lg ">
              <div>
                <Image
                  src={"/google.svg"}
                  alt="google icon"
                  width={24}
                  height={24}
                ></Image>
              </div>
              <div>
                {/* TODO: update auth here */}
                <Link href={"/home"}>Đăng nhập với Google</Link>
              </div>
            </div>
            <div className="w-96 text-center text-sm text-gray-500">
              Bằng cách sử dụng Notta, bạn đồng ý với{" "}
              <Link href={"#"} className="underline text-[#3B82F6]">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link href={"#"} className="underline text-[#3B82F6]">
                Chính sách bảo mật
              </Link>
            </div>
            <div className="w-96 text-center text-sm text-gray-500">
              Trang web này được bảo vệ bởi
              <Link href={"#"} className="underline text-[#3B82F6]">
                reCAPTCHA.
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 relative flex-auto h-full">
          <Image
            className="shrink-0"
            src={"/loginpage.svg"}
            alt="placeholder"
            width={640}
            height={640}
          ></Image>
        </div>
      </div>
    </div>
  );
}
