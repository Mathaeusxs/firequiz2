import { ExecutionContext, CanActivate, mixin } from "@nestjs/common";
import { UserRanks } from "@libs/api-interfaces/index";

//Use in controler as @UseGuards(RankGuard(UserRanks.SuperAdmin))
export const RankGuard = (rank:UserRanks) => {

  class RankGuardMixin implements CanActivate {

    canActivate(context: ExecutionContext){
      const req=context.switchToHttp().getRequest().user;
      if(req.rank>=rank){
        return true;
      }
      return false;
    }

  }

  const guard=mixin(RankGuardMixin);
  return guard;
}

