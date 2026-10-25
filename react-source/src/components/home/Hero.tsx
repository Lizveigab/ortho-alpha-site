import { Button } from "@/components/ui/button";
import { ChevronIcon, WaIcon } from "@/lib/icons";
import { buildWhatsappLink } from "@/lib/clinic";

/** Hero editorial revisado no projeto React original da Ortho Alpha. */
export function Hero() {
  return (
    <section className="oa-hero oa-hero-editorial" aria-labelledby="oa-hero-title">
      <div className="oa-hero-photo" aria-hidden="true" />
      <div className="oa-hero-wash" aria-hidden="true" />
      <div className="container oa-hero-layout">
        <div className="hero-content">
          <p className="oa-hero-overline">Ortopedia especializada em joelho · Alphaville</p>
          <h1 id="oa-hero-title">A dor no joelho não precisa <span>decidir os seus planos.</span></h1>
          <p className="lead">Ortopedia especializada em joelho, com cuidado individualizado em Alphaville.</p>
          <div className="cta-row">
            <Button size="lg" asChild className="oa-editorial-cta">
              <a href={buildWhatsappLink()} target="_blank" rel="noopener noreferrer"><WaIcon className="wa-icon" /> Agendar consulta <span aria-hidden="true">↗</span></a>
            </Button>
            <Button variant="outline-on-dark" size="lg" asChild className="oa-editorial-outline">
              <a href="/sobre">Conhecer a clínica <ChevronIcon style={{width:16,height:16}} /></a>
            </Button>
          </div>
        </div>
      </div>
      <div className="oa-hero-signature" aria-hidden="true">Alphaville · Barueri / SP</div>
    </section>
  );
}