import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useState } from "react";

interface ContactSectionProps {
  language: "EN" | "VI";
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const translations = {
    EN: {
      title: "Contact Us",
      subtitle: "Have questions? We'd love to hear from you.",
      name: "Your Name",
      email: "Email Address",
      message: "Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Please fill in all fields.",
    },
    VI: {
      title: "Liên hệ chúng tôi",
      subtitle: "Có câu hỏi? Chúng tôi rất mong được nghe từ bạn.",
      name: "Tên của bạn",
      email: "Địa chỉ Email",
      message: "Tin nhắn",
      send: "Gửi tin nhắn",
      success: "Tin nhắn đã được gửi thành công!",
      error: "Vui lòng điền đầy đủ thông tin.",
    },
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t.error);
      return;
    }

    // TODO: Implement actual form submission logic here
    console.log("Form submitted:", formData);
    toast.success(t.success);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 bg-muted/30" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    info@hanoiculturaltours.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">+84 24 3826 7890</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    52 Ly Thai To St, Hoan Kiem District, Hanoi, Vietnam
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-lg overflow-hidden shadow-card">
              <iframe
                title="Hanoi Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969479839975!2d105.83245931533268!3d21.027799993163894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x5c800d91b871a7d!2sHoan%20Kiem%20Lake!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-card space-y-4">
            <div>
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">{t.message}</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="mt-1 min-h-[150px]"
                required
              />
            </div>

            <Button type="submit" className="w-full gradient-primary">
              {t.send}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
