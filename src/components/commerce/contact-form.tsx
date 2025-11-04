"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10)
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log(values);
    alert("Merci pour votre message !");
    form.reset();
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2 text-sm text-charcoal">
        <label className="font-medium">Nom</label>
        <input
          type="text"
          {...form.register("name")}
          className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        />
        {form.formState.errors.name ? (
          <span className="text-xs text-red-500">{form.formState.errors.name.message}</span>
        ) : null}
      </div>
      <div className="space-y-2 text-sm text-charcoal">
        <label className="font-medium">Email</label>
        <input
          type="email"
          {...form.register("email")}
          className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        />
        {form.formState.errors.email ? (
          <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>
        ) : null}
      </div>
      <div className="space-y-2 text-sm text-charcoal">
        <label className="font-medium">Message</label>
        <textarea
          {...form.register("message")}
          rows={5}
          className="w-full rounded-2xl border border-charcoal/10 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        />
        {form.formState.errors.message ? (
          <span className="text-xs text-red-500">{form.formState.errors.message.message}</span>
        ) : null}
      </div>
      <Button type="submit" className="w-full">
        Envoyer
      </Button>
    </form>
  );
};

export default ContactForm;
