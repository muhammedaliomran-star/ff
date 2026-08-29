import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const inviteSchema = z.object({
  email: z.string().trim().email().max(200),
  role: z.enum(["owner", "manager", "seller"]),
  redirectTo: z.string().trim().url().max(500).optional(),
});

/** يبعت دعوة لعضو فريق جديد (المالك فقط). */
export async function inviteTeamMember({ data }: { data: { email: string; role: "owner" | "manager" | "seller"; redirectTo?: string } }): Promise<{ status: "invited" | "added" | "pending_no_email"; message?: string }> {
  const parsed = inviteSchema.parse(data);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("يجب تسجيل الدخول أولاً");

  const email = parsed.email.toLowerCase();

  const { error: inviteRowErr } = await supabase
    .from("team_invites")
    .insert({ invited_by: user.id, email, role: parsed.role } as any);

  if (inviteRowErr) {
    if (inviteRowErr.code === "23505" || /duplicate/i.test(inviteRowErr.message)) {
      throw new Error("فيه دعوة سارية للبريد ده بالفعل");
    }
    throw new Error(inviteRowErr.message);
  }

  return { status: "invited" as const };
}

