"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, ArrowRight, Send, Twitter, Facebook, Instagram, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-muted/30 to-transparent -z-10" />

      <div className="container px-4 mx-auto" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-jakarta mb-4">
            Let's Start Your Digital Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to elevate your brand? Get in touch with us for a free consultation and strategy session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div 
            className={cn(
              "lg:col-span-2 transition-all duration-1000 transform",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="bg-card rounded-lg border border-border/60 p-8 h-full">
              <h3 className="text-2xl font-bold font-jakarta mb-6">Contact Information</h3>
              <p className="text-muted-foreground mb-8">
                Have questions or ready to start? Reach out to us through any of these channels or fill out the form.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Office</h4>
                    <p className="text-muted-foreground">
                      House # 117, Block D, Sachal Goth Scheme 33,<br />
                      Karachi East
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Call Us</h4>
                  <div className="text-muted-foreground">
                    <Link href="tel:+923000191069" passHref>
                      <Button variant="link" className="p-0 h-auto text-base">
                        (+92) 300-0191069
                      </Button>
                    </Link>
                    <div>Mon - Fri, 9am - 6pm PST</div>
                  </div>
                </div>
              </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-muted-foreground">
                      grovancedigital@gmail.com<br />
                      support@grovancedigital.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <h4 className="font-medium mb-4">Connect With Us</h4>
                <p className="text-muted-foreground mb-4">
                  Follow us on social media for the latest marketing insights and company updates.
                </p>
                <div className="flex space-x-4">
                              {socialLinks.map((social) => (
                                <Link
                                  key={social.label}
                                  href={social.href}
                                  aria-label={social.label}
                                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-green-500 "
                                >
                                  <social.icon size={18} />
                                </Link>
                              ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={cn(
              "lg:col-span-3 transition-all duration-1000 transform delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="bg-card rounded-lg border border-border/60 p-8">
              <h3 className="text-2xl font-bold font-jakarta mb-6">Send Us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(123) 456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={5} />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="privacy" className="rounded text-primary focus:ring-primary" />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground">
                    I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and consent to being contacted.
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto group">
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}