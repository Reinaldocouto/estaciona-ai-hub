import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Senha muito curta", description: "Mínimo de 6 caracteres.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Senhas não conferem", description: "Verifique e tente novamente.", variant: "destructive" });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Senha redefinida!", description: "Você já pode entrar com a nova senha." });
      navigate("/", { replace: true });
    } catch (err: any) {
      toast({ title: "Erro ao redefinir senha", description: err.message ?? "Tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <>
      <Helmet>
        <title>Redefinir senha | Estaciona Aí</title>
        <meta name="description" content="Redefinir senha da sua conta Estaciona Aí com segurança." />
        <link rel="canonical" href={`${origin}/reset-password`} />
      </Helmet>

      <header className="sr-only">
        <h1>Redefinir senha</h1>
      </header>

      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <section className="w-full max-w-md">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-center">Defina sua nova senha</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Mínimo de 6 caracteres"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirmar nova senha</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Redefinindo..." : "Redefinir senha"}
                </Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground text-center">
                Este link funciona apenas se você chegou aqui pelo email de recuperação.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default ResetPassword;
