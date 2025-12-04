"use client";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { roboto, sarabun } from "@/lib/font";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phone: string;
};
function FormContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const formStartedRef = useRef(false);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, email, phone } = data;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return null;
    }
  };

  return (
    <form
      className={`flex items-center justify-center flex-col w-[100%] flex-1 md:flex-row gap-5 xs:gap-5 [&>div]:min-h-10 ${roboto.className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative w-[calc(100%-42px)] md:w-auto max-xs:min-w-[80%] min-[1600px]:min-w-[267px] flex justify-center">
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          name="name"
          placeholder="Họ và tên"
          onFocus={handleFormStart}
          className="text-white h-10 px-4 w-full rounded-sm bg-transparent border border-[#858585] border-solid placeholder:text-[#858585] outline-none focus:border-[rgb(203,202,202)] focus:border-1  transition-all duration-300 ease-in-out"
        />
        {errors.name ? (
          <div className="absolute left-0 bottom-[-1px] md:bottom-[-5px] translate-y-full text-[#EB6363] italic text-[12px] md:text-[13px] leading-[16px]">
            Họ và tên không được để trống
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="relative w-[calc(100%-42px)] md:w-auto max-xs:min-w-[80%] min-[1600px]:min-w-[267px] flex justify-center">
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onFocus={handleFormStart}
          className="text-white h-10 px-4 w-full rounded-sm bg-transparent border border-[#858585] border-solid placeholder:text-[#858585] outline-none focus:border-[rgb(203,202,202)] focus:border-1  transition-all duration-300 ease-in-out"
        />
        {errors.email ? (
          <div className="absolute left-0 bottom-[-1px] md:bottom-[-5px] translate-y-full text-[#EB6363] italic text-[12px] md:text-[13px] leading-[16px]">
            Email không được để trống
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="relative w-[calc(100%-42px)] md:w-auto max-xs:min-w-[80%] min-[1600px]:min-w-[267px] flex justify-center">
        <input
          {...register("phone", { required: true })}
          type="tel"
          id="phone"
          name="phone"
          placeholder="Số điện thoại"
          onFocus={handleFormStart}
          onKeyDown={(e) => {
            if (!/[0-9+]/.test(e.key) && e.key !== "Backspace") {
              e.preventDefault();
            }
          }}
          className="text-white h-10  px-4 w-full rounded-sm bg-transparent border border-[#858585] border-solid placeholder:text-[#858585] outline-none focus:border-[rgb(203,202,202)] focus:border-1 transition-all duration-300 ease-in-out"
        />

        {errors.phone ? (
          <div className="absolute left-0 bottom-[-1px] md:bottom-[-5px] translate-y-full text-[#EB6363] italic text-[12px] md:text-[13px] leading-[16px]">
            Số điện thoại không được để trống
          </div>
        ) : (
          ""
        )}
      </div>

      <Button
        type="submit"
        className={`h-10 max-xs:mt-3 w-[50%] md:w-auto px-8 min-[1400px]:px-16 bg-white uppercase text-[#EA0033] !font-bold ${sarabun.className} text-sm md:text-lg hover:bg-white`}
      >
        Liên hệ
      </Button>
    </form>
  );
}

export default FormContact;
