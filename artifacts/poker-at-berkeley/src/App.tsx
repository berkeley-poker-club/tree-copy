import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Admin from "@/pages/admin";
import { motion, type Variants } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaTwitch,
  FaFacebookF,
  FaLinkedinIn,
  FaDiscord,
} from "react-icons/fa";
import {
  useListEvents,
  getListEventsQueryKey,
  useListInstagramPosts,
  getListInstagramPostsQueryKey,
} from "@workspace/api-client-react";

const queryClient = new QueryClient();

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const suits = ["♠", "♥", "♦", "♣"];

function FloatingCard({
  suit,
  style,
}: {
  suit: string;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none font-bold text-[#FDB515]"
      style={{ ...style, opacity: 0.04, fontSize: "clamp(60px, 10vw, 120px)" }}
      animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
      transition={{
        duration: 7 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {suit}
    </motion.div>
  );
}

function LinkButton({
  href,
  children,
  variant = "dark",
  index = 0,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "dark" | "outline";
  index?: number;
}) {
  const base =
    "relative block w-full py-4 px-6 text-center rounded-xl font-semibold text-base tracking-wide overflow-hidden group transition-all duration-200";

  const variants: Record<string, string> = {
    gold: "bg-[#FDB515] text-[#001F3F] hover:bg-[#ffc53d] shadow-[0_0_32px_rgba(253,181,21,0.25)]",
    dark: "bg-[#0D1B2E]/80 text-white border border-[#1e3a5f] hover:border-[#FDB515]/50 hover:bg-[#0D1B2E] backdrop-blur-sm",
    outline:
      "bg-transparent text-[#FDB515] border border-[#FDB515]/40 hover:border-[#FDB515] hover:bg-[#FDB515]/8 backdrop-blur-sm",
  };

  return (
    <motion.a
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]}`}
      whileHover={{ scale: 1.018, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 z-0" />
    </motion.a>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
  index = 0,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  index?: number;
}) {
  return (
    <motion.a
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 flex items-center justify-center rounded-full bg-[#0D1B2E]/70 border border-[#1e3a5f] text-[#94a9c0] hover:text-[#FDB515] hover:border-[#FDB515]/60 hover:bg-[#0D1B2E] transition-all duration-200 backdrop-blur-sm"
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.92 }}
    >
      <Icon className="w-[18px] h-[18px]" />
    </motion.a>
  );
}

function SectionDivider({
  label,
  index = 0,
}: {
  label: string;
  index?: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="flex items-center gap-3 w-full"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FDB515]/30" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDB515]/70">
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FDB515]/30" />
    </motion.div>
  );
}

function Home() {
  const { data: events } = useListEvents({
    query: { queryKey: getListEventsQueryKey() },
  });
  const { data: instagramPosts } = useListInstagramPosts({
    query: { queryKey: getListInstagramPostsQueryKey() },
  });

  const todayStr = new Date().toISOString().split("T")[0];
  // API failures or proxy error payloads must not take down the public site.
  const eventList = Array.isArray(events) ? events : [];
  const instagramPostList = Array.isArray(instagramPosts) ? instagramPosts : [];
  const upcomingEvents = eventList.filter((e) => e.eventDate >= todayStr);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-16 px-4 overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 z-0 bg-[#020d1a]" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#003262_0%,transparent_60%)]" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,#00264a_0%,transparent_60%)]" />

      {/* Floating suit watermarks */}
      <FloatingCard suit="♠" style={{ top: "8%", left: "5%" }} />
      <FloatingCard
        suit="♥"
        style={{ top: "15%", right: "6%", color: "#FDB515" }}
      />
      <FloatingCard
        suit="♦"
        style={{ bottom: "20%", left: "3%", color: "#FDB515" }}
      />
      <FloatingCard suit="♣" style={{ bottom: "12%", right: "5%" }} />

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(253,181,21,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(253,181,21,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center gap-5">
        {/* Logo */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-5"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#FDB515]/20 blur-2xl scale-110" />
            <img
              src="/logo.png"
              alt="Poker at Berkeley"
              className="relative w-28 h-28 rounded-full object-cover border-2 border-[#FDB515]/60 shadow-[0_0_40px_rgba(253,181,21,0.3)]"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">
              Poker at Berkeley
            </h1>
            <p className="mt-2 text-[13px] text-[#7fa8c9] font-medium tracking-wide">
              UC Berkeley's premier poker organization
            </p>
          </div>
        </motion.div>

        {/* Gold divider line */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-16 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#FDB515] to-transparent"
        />

        {/* Main CTA */}
        <div className="w-full">
          <LinkButton
            href="https://poker.studentorg.berkeley.edu/"
            variant="gold"
            index={2}
          >
            Main Website
          </LinkButton>
        </div>

        {/* Join Us */}
        <div className="w-full flex flex-col gap-3">
          <SectionDivider label="Join Us" index={3} />
          <LinkButton
            href="https://docs.google.com/forms/d/e/1FAIpQLSdxzvFVWmAr78rsoMCtL-yaQafVlElf3plTJhg7cEHNfUlq8Q/viewform?usp=dialog"
            variant="dark"
            index={3}
          >
            Berkeley Membership
          </LinkButton>
          <LinkButton
            href="https://docs.google.com/forms/d/e/1FAIpQLSeMmF5-hdHQg8l-6DVjcQh7mwDMGapFE2DAfSMGnCTX9MgnAg/viewform?usp=publish-editor"
            variant="dark"
            index={4}
          >
            Stanford Membership
          </LinkButton>
        </div>

        {/* Community */}
        <div className="w-full flex flex-col gap-3">
          <SectionDivider label="Community" index={5} />
          <LinkButton
            href="https://discord.com/invite/SbS9UbZW2a"
            variant="outline"
            index={5}
          >
            <span className="inline-flex items-center gap-2">
              <FaDiscord className="w-4 h-4" />
              Discord Server
            </span>
          </LinkButton>
        </div>

        {/* Social icons */}
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="pt-2 flex flex-col items-center gap-3"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#3a5a7a] font-semibold">
            Follow Us
          </p>
          <div className="flex items-center gap-3">
            <SocialIcon
              href="https://www.instagram.com/pokeratberkeley/"
              icon={FaInstagram}
              label="Instagram"
              index={8}
            />
            <SocialIcon
              href="https://x.com/ucBerkeleyPoker"
              icon={FaTwitter}
              label="X / Twitter"
              index={9}
            />
            <SocialIcon
              href="https://www.twitch.tv/pokeratberkeley"
              icon={FaTwitch}
              label="Twitch"
              index={10}
            />
            <SocialIcon
              href="https://www.facebook.com/berkeleypokerclub/"
              icon={FaFacebookF}
              label="Facebook"
              index={11}
            />
            <SocialIcon
              href="https://www.linkedin.com/company/82825066/admin/dashboard/"
              icon={FaLinkedinIn}
              label="LinkedIn"
              index={12}
            />
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <div className="w-full flex flex-col gap-3 mt-4">
          <SectionDivider label="Upcoming Events" index={13} />
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                custom={14 + i}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="bg-[#0D1B2E]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-5 shadow-lg"
              >
                <h3 className="text-lg font-bold text-white mb-1">
                  {event.title}
                </h3>
                <p className="text-sm font-semibold text-[#FDB515] mb-2">
                  {new Date(event.eventDate + "T00:00:00").toLocaleDateString(
                    "en-US",
                    { weekday: "long", month: "long", day: "numeric" },
                  )}
                </p>
                <div className="text-sm text-[#94a9c0] space-y-0.5 mb-3">
                  <p>{event.eventTime}</p>
                  <p>{event.location}</p>
                </div>
                {event.description && (
                  <p className="text-sm text-[#7fa8c9] mt-3 pt-3 border-t border-[#1e3a5f]/50">
                    {event.description}
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              custom={14}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="bg-[#0D1B2E]/40 border border-[#1e3a5f]/50 border-dashed rounded-xl p-6 text-center"
            >
              <p className="text-[13px] text-[#7fa8c9] italic">
                No upcoming events — check back soon
              </p>
            </motion.div>
          )}
        </div>

        {/* On Instagram */}
        <div className="w-full flex flex-col gap-3 mt-4">
          <SectionDivider
            label="On Instagram"
            index={15 + upcomingEvents.length}
          />
          {instagramPostList.length > 0 ? (
            <>
              <motion.div
                custom={16 + upcomingEvents.length}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="w-full overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                <div
                  className="flex gap-3 pb-2"
                  style={{ width: "max-content" }}
                >
                  {instagramPostList.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-xl overflow-hidden border border-[#1e3a5f] shadow-lg flex-shrink-0"
                      style={{ width: 260, height: 320 }}
                    >
                      <iframe
                        src={`https://www.instagram.com/p/${post.shortcode}/embed/`}
                        scrolling="no"
                        style={{
                          width: 260,
                          height: 320,
                          border: "none",
                          display: "block",
                        }}
                        title={post.caption || post.shortcode}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.a
                custom={17 + upcomingEvents.length}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                href="https://www.instagram.com/pokeratberkeley/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-[13px] text-[#FDB515]/70 hover:text-[#FDB515] transition-colors font-medium tracking-wide"
              >
                <FaInstagram className="w-4 h-4" />
                Follow @pokeratberkeley
              </motion.a>
            </>
          ) : (
            <motion.a
              custom={16 + upcomingEvents.length}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              href="https://www.instagram.com/pokeratberkeley/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-[#0D1B2E]/40 border border-[#1e3a5f]/50 border-dashed rounded-xl p-8 text-center group hover:border-[#FDB515]/30 transition-colors"
            >
              <FaInstagram className="w-8 h-8 text-[#FDB515]/40 group-hover:text-[#FDB515]/70 transition-colors" />
              <span className="text-[15px] font-semibold text-white/80">
                @pokeratberkeley
              </span>
              <span className="text-[12px] text-[#7fa8c9]">
                Follow us on Instagram
              </span>
            </motion.a>
          )}
        </div>

        {/* Footer */}
        <motion.p
          custom={18 + upcomingEvents.length}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[11px] text-[#2a4a6a] tracking-widest uppercase pt-6 pb-4"
        >
          Go Bears &nbsp;&#183;&nbsp; Est. 2018
        </motion.p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
